import { HttpClient } from '@angular/common/http';
import { Platform } from '@angular/cdk/platform';
import { ShareButtonBase } from './base';
import { IShareButton, ShareMetaTags } from '../share.models';
export declare class LineButton extends ShareButtonBase {
    protected _props: IShareButton;
    protected _url: () => string;
    protected _http: HttpClient;
    protected _platform: Platform;
    protected _document: Document;
    protected _windowSize: string;
    protected _disableButtonClick: (disable: boolean) => void;
    protected _logger: (text: string) => void;
    protected _supportedMetaTags: ShareMetaTags;
    readonly desktop: string;
    constructor(_props: IShareButton, _url: () => string, _http: HttpClient, _platform: Platform, _document: Document, _windowSize: string, _disableButtonClick: (disable: boolean) => void, _logger: (text: string) => void);
}
