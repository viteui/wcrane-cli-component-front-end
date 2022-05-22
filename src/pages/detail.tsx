import React, { Fragment, useEffect } from 'react';
import styles from './detail.css';
import { Button, Select, Divider } from 'antd';
import { useState } from 'react';
import { getComponentItem } from '@/service';
import { CopyOutlined, EyeOutlined, CloudOutlined } from '@ant-design/icons';
import { formatCountdown } from 'antd/lib/statistic/utils';
import { copy, formatNow } from '@/utils';
import { getGitUrl, getNpmUrl, getPreviewUrl } from '../utils/git';
const marked = require('marked');
console.log(marked)
const { Option } = Select;
export default function Detail(props: { location: { query: any; }; }) {

  const [init, setInit] = useState(false);
  const [data, setData] = useState({
    classname: "",
    versions: [],
    description: '',
    git_type: "",
    git_login: "",
    readme: "",
    git_remote: ""
  });
  const [version, setVersion] = useState("")
  const [versionData, setVersionData] = useState({
    create_dt: "",
    update_dt: ""
  })

  const [previewIndex, setPreviewIndex] = useState(0);
  const [preview, setPreview] = useState([

    {
      name: "",
      index: 0,
      file: ""
    }
  ]);

  useEffect(() => {
    const query = props.location.query

    if (data && data.versions && !init && query.id) {
      getComponentItem({ id: query.id }).then(({ data }) => {
        setData(data)
        setVersion(data.versions[0].version)
      }, console.error)
    }
  }, [init])

  useEffect(() => {
    if (data && data.versions && version) {
      const versionData = data.versions.find((item: { version: string }) => item.version === version) as any
      let versionPreview = JSON.parse(versionData.example_list) as unknown as Array<any>

      versionPreview = versionPreview.map((file, index) => {
        return {
          name: `预览${index + 1}`,
          index,
          file: getPreviewUrl({
            name: data.classname,
            version: versionData.version,
            path: versionData.example_path,
            file: versionPreview[index]
          })
        }
      })
      setVersionData(versionData)
      setPreview(versionPreview)
      // console.log(formatNow(versionData?.create_dt))
    }
  }, [data, version, previewIndex])
  function handleVersionChange(val: React.SetStateAction<string>) {
    setVersion(val)
  }
  function handlePreviewIndexChange(value: React.SetStateAction<number>) {
    setPreviewIndex(value)
  }
  function createMarkup() {
    return { __html: marked.parse(data.readme) };
  }

  return (
    <div className={styles.container}>
      {
        data ?
          <Fragment>
            <div className={styles.header}>
              <div className={styles.detailName}>{data.classname}</div>
              <Select
                value={version}
                style={{ marginLeft: 10, width: 120 }}
                bordered={false}
                onChange={handleVersionChange}
              >
                {
                  data.versions.map((item: { version: string }) => (
                    <Option value={item.version} key={item.version} children={undefined} ></Option>))
                }
              </Select>
            </div>
            <div className={styles.detailContainer}>
              <div className={styles.detailDescription}>
                {data.description}
              </div>
            </div>
            <Divider />
            <div className={styles.detailContainerInfo}>
              <div className={styles.detailText}>
                代码托管：{data.git_type}
              </div>
              <div className={styles.detailText}>
                上传用户：{data.git_login}
              </div>
              <div className={styles.detailText}>
                创建时间：{formatNow(versionData?.create_dt)}
              </div>
              <div className={styles.detailText}>
                更新时间：{formatNow(versionData?.update_dt)}
              </div>

            </div>
            <Divider />
            <div className={styles.detailBtnContainer}>
              <Button
                type="primary"
                icon={<CopyOutlined />}
                className={styles.detailBtn}
                onClick={() => { window.open(getGitUrl(data)) }}
              >查看源码</Button>

              <Button
                type="primary"
                icon={<EyeOutlined />}
                className={styles.detailBtn}
                onClick={() => { window.open(preview[previewIndex].file); }}
              >组件预览</Button>
              <Select
                className={styles.detailSelect}
                value={previewIndex}
                bordered={false}
                onChange={handlePreviewIndexChange}
              >
                {preview.map((item: { name: any, index: number }) => {
                  return (
                    <Option
                      key={item.name} value={item.index}
                    >
                      {item.name}
                    </Option>
                  )
                })}
              </Select>
              <Button
                type="primary"
                icon={<CloudOutlined />}
                className={styles.detailBtn}
                onClick={() => { window.open(getNpmUrl(data, version)); }}
              >npm仓库</Button>
            </div>
            <div className={styles.detailContainer}>
              <div className={styles.detailUseContainer}>
                <div className={styles.detailUseTitle}>
                  在项目中使用
                </div>
                <Divider />
                <div className={styles.detailUseWrapper}>
                  <div className={styles.detailUseNpm}>npm install {data.classname}</div>
                  <Button type='text' icon={<CopyOutlined />} onClick={() => {
                    copy(`npm install ${data.classname}`)

                  }}>复制命令</Button>
                </div>
              </div>

            </div>
            <Divider />
            <div dangerouslySetInnerHTML={createMarkup()}></div>

          </Fragment> : ""
      }
    </div>
  );
}
