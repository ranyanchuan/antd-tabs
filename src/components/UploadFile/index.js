import React from 'react';
import { Form, Upload, Icon, Button, message } from 'antd';

@Form.create()

class UploadFile extends React.Component {

  render() {

    const props = {
      action: 'admin/bannedword/importExcel',
      ...this.props,
      name: 'file',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} 文件上传成功`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 文件上传失败`);
        }
      },
    };

    const { title = '导入文件' } = this.props;

    return (
      <Upload {...props}>
        <Button>{title}</Button>
      </Upload>
    );
  }
}

export default UploadFile;
