import React, { FC, useEffect, useState } from 'react';
import { Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { uploadFile, mergeFile } from '@/api/upload';
import TpProgress from './components/progress';
import './index.less';

const SourcePanel: FC = () => {
  const [fileObj, setFileObj] = useState<any>({ file: null });
  const [chunkList, setChunkList] = useState<any>([]);

  useEffect(() => {
    console.log('fileObj alter', fileObj);
  }, [fileObj]);

  const handleFileChange = (e: any) => {
    const [file] = e.target.files;
    if (!file) return;
    setFileObj({ ...fileObj, file });
  };

  const createProgressHandler = (item: any, chunkList: any) => {
    return (e: any) => {
      // 设置每一个切片的进度百分比
      item.percent = parseInt(String(e.loaded / e.total + 100), 10);
      setChunkList([...chunkList, item]);
    };
  };

  const uploadChunks = async (chunkList: any) => {
    const requestList = chunkList
      .map(({ file, fileName, index, chunkName }: any) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', fileName);
        formData.append('chunkName', chunkName);
        return { formData, index };
      })
      .map(({ formData, index }: any) => uploadFile(formData, createProgressHandler(chunkList[index], chunkList)));
    await Promise.all(requestList);
    mergeFile(5 * 1024 * 1024, fileObj.file.name);
  };

  const handleUpload = () => {
    if (!fileObj.file) return;
    const chunkList = createChunk(fileObj.file);
    const tmp = chunkList.map(({ file }: any, index: number) => ({
      file,
      size: file.size,
      percent: 0,
      chunkName: `${fileObj.file.name}-${index}`,
      fileName: fileObj.file.name,
      index,
    }));
    setChunkList([...tmp]);
    // 执行切片上传操作
    uploadChunks(tmp);
  };

  const createChunk = (file: File, size = 5 * 1024 * 1024) => {
    const chunkList: any = [];
    let cur = 0;
    while (cur < file.size) {
      chunkList.push({ file: file.slice(cur, cur + size) });
      cur += size;
    }
    setChunkList([...chunkList]);
    return chunkList;
  };

  return (
    <div className="source-panel">
      <input type="file" onChange={handleFileChange} />
      <Button icon={<UploadOutlined />} onClick={handleUpload}>
        Upload
      </Button>
      {fileObj.file ? <TpProgress chunkList={chunkList} totalSize={fileObj.file?.size || 0} /> : null}
    </div>
  );
};

export default SourcePanel;
