import { BehaviorSubject } from 'rxjs';
import { ShareButtonsConfig } from './share.models';
export declare class ShareService {
    /** Global config that applies on all share buttons in the app */
    config: ShareButtonsConfig;
    /** Stream that emits when config changes */
    config$: BehaviorSubject<ShareButtonsConfig>;
    constructor(config: ShareButtonsConfig);
    /**
     * Share buttons properties, used to get the text, color and icon of each button.
     */
    readonly prop: import("./share.models").IShareButtons;
    readonly windowSize: string;
    setConfig(config: ShareButtonsConfig): void;
}
