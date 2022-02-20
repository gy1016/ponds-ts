import { ITaskResult } from '@/types/task';
import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { commands } from '@/settings/editorSetting';
import { EMO_JI_MAP } from '@/settings/siteSetting';
import './index.less';

interface ICurriculum {
  tasks: ITaskResult[];
}

const Curriculum = (props: ICurriculum) => {
  const { tasks } = props;
  // const { curSelected, setCurSelected } = useState<string | number>('');
  const toolsRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  const execEditorCommand = (name: string, args: any = null) => {
    document.execCommand(name, false, args);
  };

  const toolClick = (e: any) => {
    e.preventDefault();
    const commandName: string = e.target.id;
    if (commandName === 'command-zone') return;
    const eventNameMap: { [key: string]: string } = {
      fontName: 'change',
      fontSize: 'change',
      backColor: 'change',
      foreColor: 'change',
      styleWithCSS: 'change',
      contentReadOnly: 'change',
      heading: 'change',
    };
    const needInputUrl = ['insertImage', 'createLink'];
    const eventName = eventNameMap[commandName] || 'click';
    if (eventName === 'click') {
      if (needInputUrl.includes(e.target.id)) {
        const value = window.prompt('请输入链接');
        execEditorCommand(commandName, value);
      } else {
        execEditorCommand(commandName);
      }
    } else {
      return;
    }
  };

  const selChange = (e: any) => {
    execEditorCommand(e.target.id, e.target.options[e.target.selectedIndex].value);
  };

  useEffect(() => {}, []);

  return (
    <div className="today-curriculum-panel">
      <div onClick={toolClick} className="command-zone" id="command-zone" ref={toolsRef}>
        {commands.map((c, idz) => {
          if (c.options)
            return (
              <select onChange={selChange} key={idz} className="tool" name={c.command} id={c.command} title={c.name}>
                {c.options.map((o, idx) => (
                  <option key={idx} className={`${c.command}-option`} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            );
          else return <img key={idz} className="icon tool" id={c.command} src={c.icon} alt={c.name} />;
        })}
      </div>
      <div
        className="editor-container"
        id="editor"
        ref={editorRef}
        contentEditable="true"
        suppressContentEditableWarning
      >
        {tasks.map((t, idx) => {
          return (
            <div key={t.id}>
              <h2>{`${idx + 1}. ${t.describe}`}</h2>
              <div>{`${moment(t.startAt).format('YYYY-MM-DD')}-${moment(t.endAt).format('YYYY-MM-DD')}`}</div>
              <div>{`${EMO_JI_MAP[t.belong]} 重要程度:${t.importance} 紧急程度:${t.urgency}`}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Curriculum;
