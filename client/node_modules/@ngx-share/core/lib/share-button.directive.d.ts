import { OnChanges, OnDestroy, SimpleChanges, EventEmitter, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Meta } from '@angular/platform-browser';
import { Platform } from '@angular/cdk/platform';
import { ShareService } from './share.service';
import { ShareButtonBase } from './buttons';
export declare class ShareDirective implements OnChanges, OnDestroy {
    private _meta;
    private _el;
    private _http;
    private _platform;
    private _renderer;
    private _cd;
    private _share;
    private _document;
    /** A ref to button class - used to remove previous class when the button type is changed */
    private _buttonClass;
    /** Share window closed event subscription */
    private _shareWindowClosed;
    /** Button properties */
    shareButton: ShareButtonBase;
    /** Share button type */
    shareButtonName: string;
    /** Get share count */
    getCount: boolean;
    /** Set meta tags from document head, useful when SEO is supported */
    autoSetMeta: boolean;
    /** Sharing link */
    url: string;
    /** Sets the title parameter */
    title: string;
    /** Sets the description parameter */
    description: string;
    /** Sets the image parameter for sharing on Pinterest */
    image: string;
    /** Sets the tags parameter for sharing on Twitter and Tumblr */
    tags: string;
    /** Stream that emits when share count is fetched */
    count: EventEmitter<number>;
    /** Stream that emits when share dialog is opened */
    opened: EventEmitter<string>;
    /** Stream that emits when share dialog is closed */
    closed: EventEmitter<string>;
    constructor(_meta: Meta, _el: ElementRef, _http: HttpClient, _platform: Platform, _renderer: Renderer2, _cd: ChangeDetectorRef, _share: ShareService, _document: any);
    pointerEvents: string;
    /** Share the link */
    share(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private _createShareButton;
    /** Get meta tag content */
    private _getMetaTagContent;
    private _shareButtonChanged;
    private _urlChanged;
}
