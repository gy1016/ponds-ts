import React, { ReactElement } from 'react';

class TodayEditor {
  public textArr: any;
  public position: { x: number; y: number };
  private options: any;
  private localArr: any;
  private lineHeight: number;
  private isFocus: boolean;
  private focusIndex: any;
  private TextArea: HTMLElement;

  public constructor(textArr: any, options: any = {}, parent: HTMLElement) {
    this.textArr = textArr;
    this.localArr = [];
    this.options = options;
    this.lineHeight = parseInt(this.options.font, 17);
    this.position = { x: 10, y: 10 };
    this.isFocus = false;
    this.focusIndex = [1, textArr[1].length - 1];
    // 先这么写着
    this.TextArea = document.createElement('textarea');
    parent.appendChild(this.TextArea);
  }
}
