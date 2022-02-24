import React, { useRef, useEffect, useState } from 'react';
import moment from 'moment';
import { Card } from 'antd';
import {
  Scene,
  Color,
  PerspectiveCamera,
  GridHelper,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  PlaneGeometry,
  Raycaster,
  AmbientLight,
  DirectionalLight,
  ArrowHelper,
  Vector3,
  Group,
  Vector2,
  MeshLambertMaterial,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ITaskResult } from '@/types/task';

interface IThreeSpace {
  tasks: ITaskResult[];
}

interface ITpMesh extends Mesh {
  task?: ITaskResult;
}

const MAX_SIZE = 1000;
const STEP = 200;
let camera: PerspectiveCamera;
let scene: Scene;
let renderer: WebGLRenderer;
let raycaster: Raycaster;
let mouse = new Vector2();
let plane: Mesh;
let cubeGeo = new BoxGeometry(50, 50, 50);
let INTERSECTED: any;
let width: number;
let height: number;
// const importanceAndUrgency = new Group();
// const importanceAntUnurgency = new Group();
// const UnimportanceAndUrgency = new Group();
// const UninportanceAndUnurgency = new Group();

const ThreeSpace = (props: IThreeSpace) => {
  const { tasks } = props;
  const todayGl = useRef<HTMLDivElement>(null);
  const [cardVis, setCardVis] = useState<boolean>(false);
  const [cardLeft, setCardLeft] = useState<string>('0px');
  const [cardTop, setCardTop] = useState<string>('0px');
  const [curTask, setCurTask] = useState<ITaskResult | null>(null);
  let domRect: DOMRect;

  // 分类任务并映射坐标系
  const classifyTask = () => {
    const today = moment();
    if (!tasks.length) return;
    tasks.forEach((t, idx) => {
      const tmp: ITpMesh = new Mesh(cubeGeo, new MeshLambertMaterial({ color: Math.random() * 0xffffff }));
      const difDays = moment(t.endAt).diff(today, 'days');
      tmp.position.set(t.urgency * (MAX_SIZE / 5), difDays * STEP, t.importance * (MAX_SIZE / 5));
      tmp.task = t;
      scene.add(tmp);
      // if (t.importance > 0 && t.urgency > 0) {
      //   importanceAndUrgency.add(tmp);
      // } else if (t.importance > 0 && t.urgency < 0) {
      //   importanceAntUnurgency.add(tmp);
      // } else if (t.importance < 0 && t.urgency > 0) {
      //   UnimportanceAndUrgency.add(tmp);
      // } else {
      //   UninportanceAndUnurgency.add(tmp);
      // }
    });
    // scene.add(importanceAndUrgency);
    // scene.add(importanceAntUnurgency);
    // scene.add(UnimportanceAndUrgency);
    // scene.add(UninportanceAndUnurgency);
  };

  // 初始化相机
  const initCamera = (width: number, height: number) => {
    camera = new PerspectiveCamera(70, width / height, 1, 10000);
    camera.position.set(1000, 1000, 1000);
    camera.lookAt(0, 0, 0);
  };

  // 初始化网格线
  const initGridding = () => {
    const gridHelper = new GridHelper(2 * MAX_SIZE, 10);
    scene.add(gridHelper);
  };

  // 初始化光线
  const initLight = () => {
    const ambientLight = new AmbientLight(0x606060);
    scene.add(ambientLight);

    const directionalLight = new DirectionalLight(0xffffff);
    directionalLight.position.set(1, 0.75, 0.5).normalize();
    scene.add(directionalLight);
  };

  // 初始化renderer
  const initRenderer = (width: number, height: number) => {
    renderer = new WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
  };

  // 初始化控制器
  const initControl = () => {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', threeRender);
  };

  // 初始化坐标系
  const initAxis = () => {
    scene.add(
      new ArrowHelper(new Vector3(MAX_SIZE, 0, 0), new Vector3(-MAX_SIZE, 0, 0), 2 * MAX_SIZE, 0xff0000, STEP),
      new ArrowHelper(new Vector3(0, MAX_SIZE, 0), new Vector3(0, -MAX_SIZE, 0), 2 * MAX_SIZE, 0x00ff00, STEP),
      new ArrowHelper(new Vector3(0, 0, MAX_SIZE), new Vector3(0, 0, -MAX_SIZE), 2 * MAX_SIZE, 0x0000ff, STEP),
    );
  };

  const initScene = () => {
    scene = new Scene();
    scene.background = new Color(0xf0f0f0);
  };

  const init = () => {
    width = todayGl.current!.clientWidth;
    height = todayGl.current!.clientHeight;
    // 初始化射线
    raycaster = new Raycaster();

    initScene();
    initAxis();
    initCamera(width, height);
    initGridding();
    initLight();
    initRenderer(width, height);
    initControl();
    classifyTask();

    todayGl.current?.appendChild(renderer.domElement);
  };

  const calcIntersect = () => {
    // 通过摄像机和鼠标位置更新射线
    raycaster.setFromCamera(mouse, camera);
    // 计算物体和射线的焦点
    const intersects = raycaster.intersectObjects(scene.children);
    // 判断是否选中物体，并且与之前不相等
    if (intersects.length > 0 && INTERSECTED !== intersects[0].object) {
      // 如果当前INTERSECTED不为空，把它的颜色改回去
      if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
      INTERSECTED = intersects[0].object;
      INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
      INTERSECTED.material.emissive.setHex(0xff0000);
      setCardVis(true);
      setCurTask(INTERSECTED.task);
      const { x, y } = transPosition(INTERSECTED.position);
      setCardLeft(x + 'px');
      setCardTop(y + 'px');
    } else if (!intersects.length) {
      if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
      INTERSECTED = null;
      setCardVis(false);
    }
  };

  const threeRender = () => {
    renderer.render(scene, camera);
  };

  // 三维坐标转屏幕坐标的方法
  const transPosition = (position: Vector3) => {
    let worldVector = new Vector3(position.x, position.y, position.z);
    let vector = worldVector.project(camera);
    let halfWidth = width / 2;
    let halfHeight = height / 2;
    let x = Math.round(vector.x * halfWidth + halfWidth);
    let y = Math.round(-vector.y * halfHeight + halfHeight);
    if (x + 300 > width) {
      x = x - 300;
    }
    if (y + 250 > height) {
      y = y - 250;
    }
    return { x, y };
  };

  const panelMouseDown = (event: any) => {
    if (!domRect) domRect = todayGl.current!.getBoundingClientRect();
    event.preventDefault();
    mouse.x = ((event.clientX - domRect!.left) / todayGl.current!.clientWidth) * 2 - 1;
    mouse.y = -((event.clientY - domRect!.top) / todayGl.current!.clientHeight) * 2 + 1;
    calcIntersect();
    threeRender();
  };

  useEffect(() => {
    init();
    threeRender();
  }, []);
  return (
    <div className="today-three-panel">
      <div onClick={panelMouseDown} ref={todayGl} style={{ width: '100%', height: '100%' }} />
      {cardVis ? (
        <Card style={{ width: 300, height: 250, position: 'absolute', top: cardTop, left: cardLeft, padding: '5px' }}>
          {curTask ? (
            <>
              <p>{curTask.describe}</p>
              <p>{curTask.startAt}</p>
              <p>{curTask.endAt}</p>
              <p>{curTask.importance}</p>
              <p>{curTask.urgency}</p>
            </>
          ) : null}
        </Card>
      ) : null}
    </div>
  );
};

export default ThreeSpace;
