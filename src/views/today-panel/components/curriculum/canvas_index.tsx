import { ITaskResult } from '@/types/task';
import React, { useEffect, useRef } from 'react';

interface ICurriculum {
  tasks: ITaskResult[];
}

const Curriculum = (props: ICurriculum) => {
  const { tasks } = props;
  const curriculumRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  let ctx: CanvasRenderingContext2D | null;

  const initCanvas = () => {
    const width = containerRef.current!.offsetWidth;
    const height = containerRef.current!.offsetHeight;
    curriculumRef.current!.width = width;
    curriculumRef.current!.height = height;
    ctx = curriculumRef.current!.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = 'skyblue';
  };

  const drawText = (content: string, x: number, y: number) => {
    ctx!.font = '48px serif';
    ctx!.fillText(content, x, y);
  };

  const initTasksContent = () => {
    tasks.forEach((t, idx) => {
      drawText(t.describe, 10, (idx + 1) * 50);
    });
  };

  useEffect(() => {
    initCanvas();
    initTasksContent();
  }, []);

  return (
    <div className="today-curriculum-panel" ref={containerRef}>
      <canvas ref={curriculumRef}>您的浏览器不支持canvas</canvas>
    </div>
  );
};

export default Curriculum;
