/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { Form, Icon, Spin, Upload } from 'antd';

@Form.create()

class ConUploadOneForm extends React.Component {

  state = {
    loading: false,
    fileUrl: '',
  };

  componentDidMount() {
    const { defValue } = this.props;
    this.setState({ fileUrl: defValue, loading: false });
  }

  componentWillReceiveProps(nextProps, nextState) {
    const { defValue } = nextProps;
    if (defValue !== this.props.defValue) {
      this.setState({ fileUrl: defValue, loading: false });
    }

  }


  render() {
    const {
      formItemLayout = {
        labelCol: { sm: { span: 3 } },
        wrapperCol: { sm: { span: 21 } },
      },
      title = '上传头像',
      disabled,
      form,
      required = false,
      label,
      id,
      message,
      accept,
    } = this.props;
    const { getFieldDecorator } = form;
    const { fileUrl,loading } = this.state;



    const uploadButton = (
      <div>
        {/*<Icon type={this.state.loading ? 'loading' : 'plus'}/>*/}
        <div className="ant-upload-text">{title}</div>
      </div>
    );

    return (
      <div>
        <Form.Item
          {...formItemLayout}
          label={label}
        >
          {getFieldDecorator(id, {
            rules: [{ required, message }],
            initialValue: fileUrl,

            getValueFromEvent: val => {
              const { file } = val;
              if (file.status === 'uploading') {
                this.setState({ loading: true });
              }
              if (file.status === 'done') {
                const { response } = file;
                const { link } = response.data;
                this.setState({ loading: false, fileUrl: link });
                // 服务器端
                if (link) {
                  return link;
                }
              }
            },
          })(

            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action='/admin/file/upload'
              // beforeUpload={this.beforeUpload}
              disabled={disabled}
              style={{ width: '100%' }}
              accept={accept}
            >


              <Spin spinning={loading}>
              {fileUrl ? <img src={fileUrl} alt={title} style={{ height: 90 }}/> : uploadButton}
              </Spin>

            </Upload>,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default ConUploadOneForm;
