export class useClassWatcher {
    private targetNode;
    private classToWatch;
    private classAddedCallback;
    private classRemovedCallback;
    private observer: MutationObserver | null;
    private lastClassState;

    constructor(targetNode: HTMLElement, classToWatch: string, classAddedCallback: () => void, classRemovedCallback: () => void) {
        this.targetNode = targetNode;
        this.classToWatch = classToWatch;
        this.classAddedCallback = classAddedCallback;
        this.classRemovedCallback = classRemovedCallback;
        this.observer = null;
        this.lastClassState = targetNode.classList.contains(this.classToWatch);

        this.init();
    }

    init() {
        this.observer = new MutationObserver(this.mutationCallback);
        this.observe();
    }

    observe() {
        (this.observer as MutationObserver).observe(this.targetNode, { attributes: true });
    }

    disconnect() {
        (this.observer as MutationObserver).disconnect();
    }

    mutationCallback = (mutationsList: MutationRecord[]) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                let currentClassState = (mutation.target as HTMLElement).classList.contains(this.classToWatch);
                if (this.lastClassState !== currentClassState) {
                    this.lastClassState = currentClassState;
                    if (currentClassState) {
                        this.classAddedCallback();
                    } else {
                        this.classRemovedCallback();
                    }
                }
            }
        }
    };
}
