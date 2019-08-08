import { Platform } from '@angular/cdk/platform';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IShareButton, ShareMetaTags } from '../share.models';
export declare class ShareButtonBase {
    protected _props: IShareButton;
    protected _url: () => string;
    protected _http: HttpClient;
    protected _platform: Platform;
    protected _document: Document;
    protected _windowSize: string;
    protected _disableButtonClick: (disable: boolean) => void;
    protected _logger: (text: string) => void;
    protected readonly _self: ShareButtonBase;
    /** Share button supported meta tags */
    protected readonly _supportedMetaTags: ShareMetaTags;
    /** Share button label */
    readonly text: string;
    /** Share button aria-label attribute */
    readonly ariaLabel: string;
    /** Share button color */
    readonly color: string;
    /** Share button icon (FontAwesome) */
    readonly icon: string | string[];
    readonly desktop: string | undefined;
    readonly android: string | undefined;
    readonly ios: string | undefined;
    readonly sharerUrl: string;
    /** If share button supports share count */
    supportShareCount: boolean;
    constructor(_props: IShareButton, _url: () => string, _http: HttpClient, _platform: Platform, _document: Document, _windowSize: string, _disableButtonClick: (disable: boolean) => void, _logger: (text: string) => void);
    /**
     * Opens share window
     */
    click(metaTags: ShareMetaTags): Promise<any>;
    /** Get share count of a URL */
    shareCount(url: string): Observable<number> | undefined;
    protected _serializeMetaTags(metaTags: ShareMetaTags): string;
    protected _open(serializedMetaTags: string): Promise<any>;
}
