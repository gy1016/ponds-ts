import undo from '@/assets/editor/undo.svg';
import redo from '@/assets/editor/redo.svg';
import bold from '@/assets/editor/bold.svg';
import italic from '@/assets/editor/italic.svg';
import underline from '@/assets/editor/underline.svg';
import strikeThrough from '@/assets/editor/strikeThrough.svg';
import superscript from '@/assets/editor/superscript.svg';
import subscript from '@/assets/editor/subscript.svg';
import justifyCenter from '@/assets/editor/justifyCenter.svg';
import justifyFull from '@/assets/editor/justifyFull.svg';
import justifyLeft from '@/assets/editor/justifyLeft.svg';
import justifyRight from '@/assets/editor/justifyRight.svg';
import removeFormat from '@/assets/editor/removeFormat.svg';
import insertHorizontalRule from '@/assets/editor/insertHorizontalRule.svg';
import insertUnorderedList from '@/assets/editor/insertUnorderedList.svg';
import insertOrderedList from '@/assets/editor/insertOrderedList.svg';
import createLink from '@/assets/editor/createLink.svg';
import insertImage from '@/assets/editor/insertImage.svg';

interface ICommand {
  name: string;
  command: string;
  icon?: any;
  options?: Array<{ label: string; value: string | number | readonly string[] | undefined }>;
}

export const commands: ICommand[] = [
  {
    name: '撤销',
    command: 'undo',
    icon: undo,
  },
  {
    name: '重做',
    command: 'redo',
    icon: redo,
  },
  {
    name: '字体名',
    command: 'fontName',
    options: [
      { label: '微软雅黑', value: 'Microsoft YaHei' },
      { label: '新罗马', value: 'Times New Roman' },
      { label: '宋体', value: 'SimSun' },
      { label: '平方', value: 'PingFang SC' },
      { label: '华文楷体', value: 'STKaiti' },
      { label: 'Arial', value: 'Arial' },
      { label: 'Calibri', value: 'Calibri' },
      { label: 'Comic Sans MS', value: 'Comic Sans MS' },
      { label: 'Verdana', value: 'Verdana' },
    ],
  },
  {
    name: '字体大小',
    command: 'fontSize',
    options: [
      { label: '特小', value: '1' },
      { label: '小', value: '2' },
      { label: '正常', value: '3' },
      { label: '略大', value: '4' },
      { label: '大', value: '5' },
      { label: '很大', value: '6' },
      { label: '极大', value: '7' },
    ],
  },
  // {
  //   name: '标题',
  //   command: 'heading',
  //   options: [
  //     { label: 'H1', value: 'H1' },
  //     { label: 'H2', value: 'H2' },
  //     { label: 'H3', value: 'H3' },
  //     { label: 'H4', value: 'H4' },
  //     { label: 'H5', value: 'H5' },
  //     { label: 'H6', value: 'H6' },
  //   ],
  // },
  {
    name: '加粗',
    command: 'bold',
    icon: bold,
  },
  {
    name: '斜体',
    command: 'italic',
    icon: italic,
  },
  {
    name: '下划线',
    command: 'underline',
    icon: underline,
  },
  {
    name: '删除线',
    command: 'strikeThrough',
    icon: strikeThrough,
  },
  {
    name: '背景颜色',
    command: 'backColor',
    options: [
      { label: '黑', value: 'black' },
      { label: '红', value: 'red' },
      { label: '橙', value: 'orange' },
      { label: '蓝', value: 'blue' },
      { label: '绿', value: 'green' },
      { label: '白', value: 'white' },
      { label: '灰', value: '#999' },
      { label: '浅灰', value: '#ddd' },
    ],
  },
  {
    name: '字体颜色',
    command: 'foreColor',
    options: [
      { label: '黑', value: 'black' },
      { label: '红', value: 'red' },
      { label: '橙', value: 'orange' },
      { label: '蓝', value: 'blue' },
      { label: '绿', value: 'green' },
      { label: '白', value: 'white' },
      { label: '灰', value: '#999' },
      { label: '浅灰', value: '#ddd' },
    ],
  },
  {
    name: '上标',
    command: 'superscript',
    icon: superscript,
  },
  {
    name: '下标',
    command: 'subscript',
    icon: subscript,
  },
  {
    name: '居中对齐',
    command: 'justifyCenter',
    icon: justifyCenter,
  },
  {
    name: '两端对齐',
    command: 'justifyFull',
    icon: justifyFull,
  },
  {
    name: '左对齐',
    command: 'justifyLeft',
    icon: justifyLeft,
  },
  {
    name: '右对齐',
    command: 'justifyRight',
    icon: justifyRight,
  },
  {
    name: '清除样式',
    command: 'removeFormat',
    icon: removeFormat,
  },
  {
    name: '分割线',
    command: 'insertHorizontalRule',
    icon: insertHorizontalRule,
  },
  {
    name: '无序列表',
    command: 'insertUnorderedList',
    icon: insertUnorderedList,
  },
  {
    name: '有序列表',
    command: 'insertOrderedList',
    icon: insertOrderedList,
  },
  // {
  //   name: '字体变大',
  //   command: 'increaseFontSize',
  // },
  // {
  //   name: '字体变小',
  //   command: 'decreaseFontSize',
  // },
  // {
  //   name: '标记方式',
  //   command: 'styleWithCSS',
  //   options: [
  //     { label: 'html标签', value: 0 },
  //     { label: 'css样式', value: 1 },
  //   ],
  // },
  {
    name: '插入链接',
    command: 'createLink',
    icon: createLink,
  },
  {
    name: '插入图片',
    command: 'insertImage',
    icon: insertImage,
  },
  // {
  //   name: '区域是否可以编辑',
  //   command: 'contentReadOnly',
  //   options: [
  //     { label: '是', value: 0 },
  //     { label: '否', value: 1 },
  //   ],
  // },
];
