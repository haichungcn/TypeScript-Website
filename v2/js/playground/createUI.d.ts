export interface UI {
    showModal: (message: string, subtitle?: string, buttons?: any) => void;
}
export declare const createUI: () => UI;
