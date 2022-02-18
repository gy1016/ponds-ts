import React, { useRef, useEffect } from 'react';
import moment from 'moment';
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
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ITaskResult } from '@/types/task';

interface IThreeSpace {
  tasks: ITaskResult[];
}

const ThreeSpace = (props: IThreeSpace) => {
  const { tasks } = props;
  const todayGl = useRef<HTMLDivElement>(null);
  const MAX_SIZE = 1000;
  const STEP = 200;
  let camera: PerspectiveCamera;
  let scene: Scene;
  let renderer: WebGLRenderer;
  let raycaster: Raycaster;
  let plane: Mesh;
  let cubeGeo = new BoxGeometry(50, 50, 50);
  let cubeMaterial = new MeshBasicMaterial({ color: 0xfeb74c });
  const importanceAndUrgency = new Group();
  const importanceAntUnurgency = new Group();
  const UnimportanceAndUrgency = new Group();
  const UninportanceAndUnurgency = new Group();

  // 分类任务并映射坐标系
  const classifyTask = () => {
    const today = moment();
    if (!tasks.length) return;
    tasks.forEach((t, idx) => {
      const tmp = new Mesh(cubeGeo, cubeMaterial);
      const difDays = moment(t.endAt).diff(today, 'days');
      tmp.position.set(t.urgency * (MAX_SIZE / 5), difDays * STEP, t.importance * (MAX_SIZE / 5));
      if (t.importance > 0 && t.urgency > 0) {
        importanceAndUrgency.add(tmp);
      } else if (t.importance > 0 && t.urgency < 0) {
        importanceAntUnurgency.add(tmp);
      } else if (t.importance < 0 && t.urgency > 0) {
        UnimportanceAndUrgency.add(tmp);
      } else {
        UninportanceAndUnurgency.add(tmp);
      }
    });
    scene.add(importanceAndUrgency);
    scene.add(importanceAntUnurgency);
    scene.add(UnimportanceAndUrgency);
    scene.add(UninportanceAndUnurgency);
  };

  // 初始化相机
  const initCamera = (width: number, height: number) => {
    camera = new PerspectiveCamera(45, width / height, 50, 4000);
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
    const width = todayGl.current!.clientWidth;
    const height = todayGl.current!.clientHeight;

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

  const threeRender = () => {
    renderer.render(scene, camera);
  };

  useEffect(() => {
    init();
    threeRender();
    console.log(tasks);
  }, []);
  return <div className="today-three-panel" ref={todayGl} />;
};

export default ThreeSpace;
