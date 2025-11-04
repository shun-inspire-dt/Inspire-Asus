export class useToggleBlocks {
    private block;

    constructor(block: HTMLElement) {
        this.block = block;
    }

    show(height: number | string = 0) {
        if (this.block) {
            if (this.block.style.display === 'block') return;

            this.block.style.transitionDuration = '500ms';
            this.block.style.transitionProperty = 'height';
            this.block.style.transitionTimingFunction = 'cubic-bezier(0.4, 0, 0.2, 1)';
            this.block.style.display = 'block';
            setTimeout(() => {
                this.block.style.height = height + 'px';
                setTimeout(() => {
                    this.block.style.height = 'auto';
                }, 800);
            }, 100);
        }
    }

    hide() {
        setTimeout(() => {
            if (this.block) {
                this.block.style.height = '0px';
                setTimeout(() => {
                    this.block.style.display = 'none';
                }, 800);
            }
        }, 800);
    }
}
