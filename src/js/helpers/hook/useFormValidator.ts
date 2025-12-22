import './useFormValidator.scss';

declare global {
    interface Window {
        FormValidator?: typeof FormValidator;
    }
}

type LocaleKey = keyof typeof I18N_MESSAGES;

type AsyncValidatorResult =
    | boolean
    | {
          isValid?: boolean;
          valid?: boolean;
          ok?: boolean;
          feedback?: string;
      };

type AsyncValidator = (input: HTMLInputElement | HTMLSelectElement) => Promise<AsyncValidatorResult>;

type FormValidatorOptions = {
    reportValidity?: boolean;
    asyncValidators?: Record<string, AsyncValidator>;
    onValidSubmit?: (payload: {
        form: HTMLFormElement;
        controls: Record<string, Element>;
        submitter: HTMLElement | null;
    }) => void;
};

/**
 * 國際化訊息配置
 */
const I18N_MESSAGES = {
    'zh-TW': {
        required: '此欄位為必填',
        pattern: '請符合要求格式',
        tel: '請輸入正確的電話號碼',
        phone: '請輸入正確的電話號碼',
        email: (value: string) => {
            if (!value.includes('@')) {
                return `請在電子郵件地址中包括「@」。「${value}」未包含「@」`;
            } else {
                return `請輸入「@」後面的部分。「${value}」不是完整值。`;
            }
        },
        minLength: (minLength: string | number, currentLength: number) =>
            `請將這段文字加長到 ${minLength} 個字元以上 (目前已有 ${currentLength} 個字元數)`,
        maxLength: (maxLength: string | number, currentLength: number) =>
            `請將這段文字縮短到 ${maxLength} 個字元以下 (目前已有 ${currentLength} 個字元數)`,
        min: (min: string | number) => `值必須大於或等於 ${min}。`,
        max: (max: string | number) => `值必須小於或等於 ${max}。`,
        regex: '',
        passwordConfirm: '與密碼不符合'
    },
    'en-US': {
        required: 'This field is required',
        pattern: 'Please match the required format',
        tel: 'Please enter a valid phone number',
        phone: 'Please enter a valid phone number',
        email: (value: string) => {
            if (!value.includes('@')) {
                return `Please include an '@' in the email address. '${value}' is missing an '@'`;
            } else {
                return `Please enter the part following '@'. '${value}' is not a complete value.`;
            }
        },
        minLength: (minLength: string | number, currentLength: number) =>
            `Please lengthen this text to ${minLength} characters or more (you are currently using ${currentLength} characters)`,
        maxLength: (maxLength: string | number, currentLength: number) =>
            `Please shorten this text to ${maxLength} characters or less (you are currently using ${currentLength} characters)`,
        min: (min: string | number) => `Value must be greater than or equal to ${min}.`,
        max: (max: string | number) => `Value must be less than or equal to ${max}.`,
        regex: '',
        passwordConfirm: 'Passwords do not match'
    },
    'ja-JP': {
        required: 'このフィールドを入力してください',
        pattern: '要求された形式に一致させてください',
        tel: '正しい電話番号を入力してください',
        phone: '正しい電話番号を入力してください',
        email: (value: string) => {
            if (!value.includes('@')) {
                return `メールアドレスに「@」を含めてください。「${value}」には「@」がありません`;
            } else {
                return `「@」の後の部分を入力してください。「${value}」は完全な値ではありません。`;
            }
        },
        minLength: (minLength: string | number, currentLength: number) =>
            `このテキストを${minLength}文字以上にしてください（現在${currentLength}文字です）`,
        maxLength: (maxLength: string | number, currentLength: number) =>
            `このテキストを${maxLength}文字以下にしてください（現在${currentLength}文字です）`,
        min: (min: string | number) => `値は${min}以上である必要があります。`,
        max: (max: string | number) => `値は${max}以下である必要があります。`,
        regex: '',
        passwordConfirm: 'パスワードが一致しません'
    }
} as const;

/**
 * 表單驗證器類別
 */
export class FormValidator {
    static SELECTORS = {
        form: 'form.needs-validation[novalidate]',
        errorText: '.error-text',
        formInputGroup: '.form-input-group',
        nativeInputs: 'input[required]:not([data-valid]):not([type="checkbox"], [type="radio"])',
        nativeSelects: 'select[required]:not([data-valid])',
        specialWrapper: '.form-check, .password-input-wrapper',
        wrapperInputs: '.form-check input[required], .password-input-wrapper input[required]',
        formCheckFeedbackErrorText: '.form-check-feedback-text.error-text',
        checkboxRequired: 'input[type="checkbox"][required], input[type="radio"][required]',
        validInputs: 'input[data-valid][required]:not([type="checkbox"], [type="radio"]), select[data-valid][required]'
    } as const;

    public form: HTMLFormElement;
    private locale: LocaleKey | string;
    private messages: (typeof I18N_MESSAGES)[LocaleKey];
    private options: FormValidatorOptions;

    private _validationRunId = 0;
    // private _isProgrammaticSubmit = false;
    private _isSubmitting = false;

    constructor(form?: HTMLFormElement | null, options: FormValidatorOptions = {}) {
        // eslint-disable-next-line no-console
        console.log('Form Validator Initialized !!');
        const resolvedForm = form || (document.querySelector(FormValidator.SELECTORS.form) as HTMLFormElement | null);
        if (!resolvedForm) throw new Error('FormValidator: Form Element Not Found');
        this.form = resolvedForm;

        const { locale = this.getCurrentLocale(), reportValidity = 'false' } = (this.form.dataset || {}) as {
            locale?: string;
            reportValidity?: string;
        };

        this.locale = locale || this.getCurrentLocale();
        const resolved =
            (I18N_MESSAGES as Record<string, (typeof I18N_MESSAGES)[LocaleKey]>)[this.locale] || I18N_MESSAGES['zh-TW'];
        this.messages = resolved;

        this.options = {
            reportValidity: reportValidity !== 'false',
            asyncValidators: options.asyncValidators,
            ...options
        };

        this.cacheOriginFeedbackText();
        this.setupEventListeners();
    }

    /**
     * 取得當前語系
     */
    private getCurrentLocale() {
        const htmlElement = document.documentElement;
        return this.form?.dataset?.locale || htmlElement.dataset.locale || htmlElement.lang || navigator.language || 'zh-TW';
    }

    /**
     * 是否啟用即時驗證
     * 當表單未通過 checkValidity 時，input/select 的變更會觸發驗證
     */
    private isLiveValidateEnabled() {
        const value = this.form.dataset.liveValidate;
        return value === '' || value === 'true';
    }

    /**
     * 快取頁面上預設的錯誤文案
     * 避免 resetErrorMessages 將「原本就存在的提示文字」清空
     */
    private cacheOriginFeedbackText() {
        const errorTextEls = this.form.querySelectorAll(FormValidator.SELECTORS.errorText);
        errorTextEls.forEach((errorTextEl) => {
            if (errorTextEl.hasAttribute('data-valid-origin-feedback')) return;
            const originText = (errorTextEl.textContent || '').trim();
            if (originText) {
                errorTextEl.setAttribute('data-valid-origin-feedback', originText);
            }
        });
    }

    /**
     * 重置所有錯誤訊息
     */
    private resetErrorMessages() {
        const errorTextEls = this.form.querySelectorAll(FormValidator.SELECTORS.errorText);
        errorTextEls.forEach((errorTextEl) => {
            const originFeedback = errorTextEl.getAttribute('data-valid-origin-feedback');
            errorTextEl.textContent = originFeedback || '';
        });
    }

    /**
     * 執行表單的所有驗證流程
     * - 先重置錯誤訊息（依 data-valid-origin-feedback 還原或清空）
     * - 依序執行原生驗證、checkbox/radio 驗證、客製化驗證與 wrapper 狀態更新
     */
    private async runAllValidations() {
        const runId = ++this._validationRunId;
        this.resetErrorMessages();
        this.handleNativeValidation();
        this.handleSelectValidation();
        this.handleCheckboxValidation();
        await this.handleCustomValidation(runId);
        this.handleWrapperValidation();
    }

    /**
     * 取得錯誤訊息元素
     */
    private getErrorElement(input: HTMLElement, isSpecialInput: boolean = false): Element | null {
        const parent = input.closest(FormValidator.SELECTORS.specialWrapper);
        if (isSpecialInput || parent) {
            return (() => {
                const errorTextEl = parent
                    ?.closest(FormValidator.SELECTORS.formInputGroup)
                    ?.querySelector(FormValidator.SELECTORS.errorText);
                if (errorTextEl) return errorTextEl || null;
                else {
                    const nextSibling = parent?.nextElementSibling;
                    if (nextSibling?.matches(FormValidator.SELECTORS.formCheckFeedbackErrorText)) return nextSibling;
                    else return parent?.parentElement?.querySelector(FormValidator.SELECTORS.formCheckFeedbackErrorText) || null;
                }
            })();
        }
        return input?.closest(FormValidator.SELECTORS.formInputGroup)?.querySelector(FormValidator.SELECTORS.errorText) || null;
    }

    /**
     * 判斷元素的文字內容是否為空
     * 供錯誤訊息更新流程共用，避免重複的 textContent/trim 判斷
     */
    private isEmptyTextContent(element: Element | null) {
        const text = element?.textContent;
        return !text || text.trim() === '';
    }

    /**
     * 更新錯誤訊息
     * 僅在錯誤訊息元素原本為空時，才寫入 feedback
     * 若錯誤訊息元素本來就有文案，則永遠不覆蓋（保留設計稿/頁面原始文案）
     */
    private updateErrorMessage(errorTextEl: Element | null, feedback: string) {
        if (!errorTextEl) return;
        if (!this.isEmptyTextContent(errorTextEl)) return;
        if (!feedback) return;
        errorTextEl.textContent = feedback;
    }

    public setErrorMessage(input: HTMLElement, feedback: string, isSpecialInput: boolean = false) {
        const errorTextEl = this.getErrorElement(input, isSpecialInput);
        this.updateErrorMessage(errorTextEl, feedback);
    }

    /**
     * 設定驗證狀態
     */
    private setValidationState(
        input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
        isInvalid: boolean,
        feedback = '',
        element: HTMLElement | null = null
    ) {
        const targetElement = element || input;

        if (!this.form.classList.contains('was-validated')) {
            this.form.classList.toggle('was-validated', isInvalid);
        }

        if (!targetElement.classList.contains('is-invalid')) {
            targetElement.classList.toggle('is-invalid', !isInvalid);
        }

        if (input.setCustomValidity) {
            input.setCustomValidity(isInvalid ? feedback : '');
        }
    }

    private beginSubmitLoading(event: SubmitEvent) {
        const needsLoading = this.form.dataset.needsLoading === 'true';
        const submitter = (event as unknown as { submitter?: HTMLElement | null }).submitter;
        const submitButton = submitter instanceof HTMLButtonElement ? submitter : null;
        const loadingText = submitButton?.getAttribute('data-loading-text') ?? null;
        const originTextAttrName = 'data-loading-origin-text';

        if (needsLoading) {
            if (submitButton) submitButton.disabled = true;
            this.form.setAttribute('data-loading', 'true');

            if (submitButton && loadingText !== null) {
                if (!submitButton.hasAttribute(originTextAttrName)) {
                    submitButton.setAttribute(originTextAttrName, submitButton.textContent || '');
                }

                submitButton.textContent = loadingText === '...' ? '' : loadingText;
            }
        }

        return {
            needsLoading,
            submitButton,
            loadingText,
            originTextAttrName
        };
    }

    private endSubmitLoading(
        context: {
            needsLoading: boolean;
            submitButton: HTMLButtonElement | null;
            loadingText: string | null;
            originTextAttrName: string;
        } | null
    ) {
        if (!context?.needsLoading) return;

        const { submitButton, loadingText, originTextAttrName } = context;

        if (submitButton) submitButton.disabled = false;
        this.form.setAttribute('data-loading', 'false');

        if (submitButton && loadingText !== null && submitButton.hasAttribute(originTextAttrName)) {
            submitButton.textContent = submitButton.getAttribute(originTextAttrName) || '';
            submitButton.removeAttribute(originTextAttrName);
        }
    }

    private getFormData(event: SubmitEvent) {
        const submitter = (event as unknown as { submitter?: HTMLElement | null }).submitter || null;
        const inputs: Record<string, Element> = {};
        Array.from(this.form.elements)
            .filter(
                (el): el is HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement =>
                    el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement
            )
            .forEach((el) => {
                inputs[el.id || el.name] = el;
            });
        return {
            form: this.form,
            controls: inputs,
            submitter
        };
    }

    private emitValidatedEvent(event: SubmitEvent) {
        this.form.dispatchEvent(
            new CustomEvent('form:validated', {
                detail: this.getFormData(event)
            })
        );
    }

    /**
     * 通用驗證處理器
     */
    private handleValidation(
        input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
        isInvalid: boolean,
        feedback: string,
        element: HTMLElement | null = null
    ) {
        this.setValidationState(input, isInvalid, feedback, element);

        if (isInvalid) {
            this.setErrorMessage(input, feedback, !!element);
        }
    }

    /**
     * 手動觸發驗證（不依賴表單提交）
     * 用於在表單未提交時手動觸發驗證顯示
     * @param input - 要驗證的表單元素
     * @param isInvalid - 是否為無效狀態
     * @param feedback - 驗證反饋訊息
     * @param element - 可選的附加元素（如自定義錯誤訊息容器）
     */
    public triggerValidation(
        input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
        isInvalid: boolean,
        feedback: string,
        element: HTMLElement | null = null
    ) {
        if (!this.form.classList.contains('was-validated')) {
            this.form.classList.add('was-validated');
        }
        this.handleValidation(input, isInvalid, feedback, element);
        this.handleWrapperValidation();
    }

    /**
     * 處理原生 HTML5 驗證
     */
    private handleNativeValidation() {
        const nativeInputs = this.form.querySelectorAll(FormValidator.SELECTORS.nativeInputs);
        const rules = this.getValidationRules();

        nativeInputs.forEach((input) => {
            if (!(input instanceof HTMLInputElement)) return;
            const value = input.value;

            const validationOrder = [
                {
                    condition: () => !value,
                    getDefaultMessage: () => rules.required.getDefaultMessage()
                },
                {
                    condition: () => value && input.type === 'email' && !/^\S+@\S+\.\S+$/.test(value),
                    getDefaultMessage: () => rules.email.getDefaultMessage(input)
                },
                {
                    condition: () => value && input.minLength > 0 && value.length < parseInt(String(input.minLength)),
                    getDefaultMessage: () => rules.minLength.getDefaultMessage(input)
                },
                {
                    condition: () => value && input.maxLength > 0 && value.length > parseInt(String(input.maxLength)),
                    getDefaultMessage: () => rules.maxLength.getDefaultMessage(input)
                },
                {
                    condition: () => value && input.min && parseFloat(value) < parseFloat(String(input.min)),
                    getDefaultMessage: () => rules.min.getDefaultMessage(input)
                },
                {
                    condition: () => value && input.max && parseFloat(value) > parseFloat(String(input.max)),
                    getDefaultMessage: () => rules.max.getDefaultMessage(input)
                },
                {
                    condition: () => value && input.pattern && !new RegExp(input.pattern).test(value),
                    getDefaultMessage: () => rules.pattern.getDefaultMessage()
                }
            ];

            for (let i = 0; i < validationOrder.length; i++) {
                const validation = validationOrder[i];
                if (validation.condition()) {
                    const feedback = validation.getDefaultMessage();
                    this.handleValidation(input, true, feedback, null);
                    return;
                }
            }

            this.handleValidation(input, false, '');
        });
    }

    /**
     * 處理 select 的 required 驗證
     */
    private handleSelectValidation() {
        const selects = this.form.querySelectorAll(FormValidator.SELECTORS.nativeSelects);

        selects.forEach((select) => {
            if (!(select instanceof HTMLSelectElement)) return;
            const value = select.value;
            const isInvalid = !value;
            const { validFeedback: feedback = '' } = select.dataset;

            this.handleValidation(select, isInvalid, feedback || this.messages.required);
        });
    }

    /**
     * 處理 async 驗證
     */
    private async handleAsyncValidation(
        input: HTMLInputElement | HTMLSelectElement,
        valids: string[],
        feedbacks: string[],
        runId: number
    ) {
        const asyncIndex = valids.indexOf('async');
        const asyncFeedback = feedbacks[asyncIndex] || this.messages.pattern;
        const targetKey = (input as HTMLElement).dataset.target;
        const asyncMap = this.options?.asyncValidators;
        const asyncFn = targetKey ? asyncMap?.[targetKey] : null;

        const shouldDisableInput = input.getAttribute('data-loading') !== 'false';
        const originDisabled = input.disabled;
        const originLoadingAttr = input.getAttribute('data-loading');

        if (typeof asyncFn !== 'function') {
            // eslint-disable-next-line no-console
            console.warn('FormValidator: 找不到 async validation function', { input, targetKey });
            return;
        }

        input.setAttribute('data-async-run-id', String(runId));
        input.setAttribute('data-loading', 'true');
        if (shouldDisableInput) input.disabled = true;

        try {
            const result = await asyncFn(input);

            if (runId !== this._validationRunId) return;

            const isValid = (() => {
                if (typeof result === 'boolean') return result;
                if (result && typeof result === 'object') {
                    if (typeof result.isValid === 'boolean') return result.isValid;
                    if (typeof result.valid === 'boolean') return result.valid;
                    if (typeof result.ok === 'boolean') return result.ok;
                }
                return false;
            })();

            const customFeedback =
                result && typeof result === 'object' && typeof result.feedback === 'string' ? result.feedback : '';

            this.handleValidation(input, !isValid, customFeedback || asyncFeedback);
        } finally {
            if (input.getAttribute('data-async-run-id') !== String(runId)) return;
            input.removeAttribute('data-async-run-id');

            if (originLoadingAttr === null) input.removeAttribute('data-loading');
            else input.setAttribute('data-loading', originLoadingAttr);

            if (shouldDisableInput) input.disabled = originDisabled;
        }
    }

    /**
     * 處理包裝容器的驗證狀態
     * 針對 .form-check 和 .password-input-wrapper 底下的 input
     */
    private handleWrapperValidation() {
        const wrapperInputs = this.form.querySelectorAll(FormValidator.SELECTORS.wrapperInputs);
        wrapperInputs.forEach((input) => {
            if (!(input instanceof HTMLInputElement)) return;
            const isInvalid = !input.checkValidity();

            const wrapper = input.closest('.form-check, .password-input-wrapper');
            if (wrapper) {
                wrapper.classList.toggle('is-invalid', isInvalid);
            }
        });
    }

    /**
     * 處理複選框驗證
     */
    private handleCheckboxValidation() {
        const checkboxInputs = this.form.querySelectorAll(FormValidator.SELECTORS.checkboxRequired);
        checkboxInputs.forEach((input) => {
            if (!(input instanceof HTMLInputElement)) return;
            const { validFeedback: feedback = '' } = input.dataset;
            const isInvalid = !input.checkValidity();

            if (isInvalid) {
                const errorTextEl = this.getErrorElement(input, true);
                const mergedFeedback = (errorTextEl?.textContent || '').trim() || feedback || this.messages.required;
                this.setErrorMessage(input, mergedFeedback, true);
            }
        });
    }

    /**
     * 驗證規則配置
     */
    private getValidationRules() {
        return {
            required: {
                validate: (value: string) => !value,
                getDefaultMessage: () => this.messages.required
            },
            pattern: {
                validate: (value: string, input: HTMLInputElement) =>
                    value && !!input.pattern && !new RegExp(input.pattern).test(value),
                getDefaultMessage: () => this.messages.pattern
            },
            tel: {
                validate: (value: string) => value && !/^09\d{8}$/.test(value),
                getDefaultMessage: () => this.messages.tel
            },
            phone: {
                validate: (value: string) => value && !/^09\d{8}$/.test(value),
                getDefaultMessage: () => this.messages.phone
            },
            email: {
                validate: (value: string) => value && !/^\S+@\S+\.\S+$/.test(value),
                getDefaultMessage: (input: HTMLInputElement) =>
                    typeof this.messages.email === 'function' ? this.messages.email(input.value) : this.messages.email
            },
            minLength: {
                validate: (value: string, input: HTMLInputElement) => value && value.length < parseInt(String(input.minLength)),
                getDefaultMessage: (input: HTMLInputElement) =>
                    typeof this.messages.minLength === 'function'
                        ? this.messages.minLength(input.minLength, input.value.length)
                        : this.messages.minLength
            },
            maxLength: {
                validate: (value: string, input: HTMLInputElement) => value && value.length > parseInt(String(input.maxLength)),
                getDefaultMessage: (input: HTMLInputElement) =>
                    typeof this.messages.maxLength === 'function'
                        ? this.messages.maxLength(input.maxLength, input.value.length)
                        : this.messages.maxLength
            },
            min: {
                validate: (value: string, input: HTMLInputElement) => value && parseFloat(value) < parseFloat(String(input.min)),
                getDefaultMessage: (input: HTMLInputElement) =>
                    typeof this.messages.min === 'function' ? this.messages.min(input.min) : this.messages.min
            },
            max: {
                validate: (value: string, input: HTMLInputElement) => value && parseFloat(value) > parseFloat(String(input.max)),
                getDefaultMessage: (input: HTMLInputElement) =>
                    typeof this.messages.max === 'function' ? this.messages.max(input.max) : this.messages.max
            },
            regex: {
                validate: (value: string, input: HTMLInputElement) => {
                    const regex = new RegExp((input as HTMLElement).dataset.validRegex || '');
                    return value && !regex.test(value);
                },
                getDefaultMessage: () => this.messages.regex
            },
            confirm: {
                validate: (value: string, input: HTMLInputElement) => {
                    const target = (input as HTMLElement).dataset.target;
                    if (!target) return false;
                    const targetInput = document.querySelector(target) as HTMLInputElement | null;
                    const targetValue = targetInput?.value || '';
                    return value && targetValue !== value;
                },
                getDefaultMessage: () => this.messages.passwordConfirm
            }
        };
    }

    /**
     * 處理客製化驗證
     */
    private async handleCustomValidation(runId: number) {
        const validInputs = this.form.querySelectorAll(FormValidator.SELECTORS.validInputs);
        const rules = this.getValidationRules();

        for (const inputEl of validInputs) {
            const input = inputEl as HTMLInputElement | HTMLSelectElement;
            const { valid = '', validFeedback = '' } = (input as HTMLElement).dataset;
            const valids = valid.split(',');
            const feedbacks = validFeedback.split(',');
            const value = (input as HTMLInputElement).value;

            if (valids.includes('required') || (input as HTMLInputElement).required) {
                const validIndex = valids.indexOf('required');
                const rule = rules.required;
                const isInvalid = rule.validate(value);
                const feedback = feedbacks[validIndex] || rule.getDefaultMessage();

                this.handleValidation(input, isInvalid, feedback);
                if (isInvalid) continue;
            }

            if (!value && !valids.includes('confirm')) continue;

            for (const validType of valids) {
                if (validType === 'required') continue;

                if (validType === 'async') {
                    if (!(input instanceof HTMLInputElement) && !(input instanceof HTMLSelectElement)) continue;
                    if (!input.checkValidity() && !(input as HTMLInputElement).validity.valueMissing) continue;
                    await this.handleAsyncValidation(input, valids, feedbacks, runId);
                    if (!input.checkValidity()) break;
                    continue;
                }

                const rule = (rules as Record<string, any>)[validType];
                if (!rule) continue;

                const validIndex = valids.indexOf(validType);
                const isInvalid = rule.validate(value, input);
                const feedback = feedbacks[validIndex] || rule.getDefaultMessage(input);

                if (validType === 'confirm') {
                    const parent = (input as HTMLElement).closest('.password-input-wrapper') as HTMLElement | null;
                    this.handleValidation(input, isInvalid, feedback, parent);
                } else {
                    this.handleValidation(input, isInvalid, feedback);
                }

                if (isInvalid) {
                    break;
                }
            }
        }
    }

    /**
     * 設置事件監聽器
     */
    private setupEventListeners() {
        this.form.addEventListener('submit', async (event) => {
            const submitEvent = event as SubmitEvent;

            // if (this._isProgrammaticSubmit) {
            //     this._isProgrammaticSubmit = false;
            //     return;
            // }

            if (this._isSubmitting) {
                event.preventDefault();
                event.stopPropagation();
                return;
            }

            this._isSubmitting = true;
            const loadingContext = this.beginSubmitLoading(submitEvent);

            event.preventDefault();
            event.stopPropagation();

            try {
                await this.runAllValidations();

                if (!this.form.checkValidity()) {
                    this.form.classList.add('was-validated');

                    if (this.options.reportValidity) {
                        this.form.reportValidity();
                    }
                    return;
                }

                const { onValidSubmit } = this.options;
                const formData = this.getFormData(submitEvent);
                if (typeof onValidSubmit === 'function') {
                    onValidSubmit(formData);
                    return;
                }

                this.emitValidatedEvent(submitEvent);

                // this._isProgrammaticSubmit = true;
            } finally {
                this._isSubmitting = false;
                this.endSubmitLoading(loadingContext);
            }
        });

        this.form.addEventListener('reset', () => {
            setTimeout(() => {
                this.form.classList.remove('was-validated');

                const invalidEls = this.form.querySelectorAll('.is-invalid');
                invalidEls.forEach((el) => el.classList.remove('is-invalid'));

                const inputs = Array.from(this.form.elements).filter(
                    (el): el is HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement =>
                        el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement
                );
                inputs.forEach((el) => {
                    if (typeof el.setCustomValidity === 'function') {
                        el.setCustomValidity('');
                    }
                });

                this.resetErrorMessages();
                this.handleWrapperValidation();
            }, 0);
        });

        if (this.isLiveValidateEnabled()) {
            const handleLiveValidate = async (event: Event) => {
                const target = event.target;
                if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement)) return;
                if (this.form.checkValidity()) return;

                await this.runAllValidations();
            };

            // this.form.addEventListener('input', handleLiveValidate);
            this.form.addEventListener('change', handleLiveValidate);
        }
    }
}

export const useFormValidator = (options: FormValidatorOptions = {}) => {
    const forms = document.querySelectorAll<HTMLFormElement>(FormValidator.SELECTORS.form);
    return Array.from(forms).map((form) => new FormValidator(form, options));
};

window.FormValidator = FormValidator;
