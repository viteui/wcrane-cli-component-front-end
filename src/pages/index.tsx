import { Card, Col, Divider, Row } from 'antd';
import Search from 'antd/lib/input/Search';
import styles from './index.less';
import { EditOutlined, EllipsisOutlined, SettingOutlined, EyeOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { getComponentList } from '../service/index';
import Meta from 'antd/lib/card/Meta';
import { getGitAvatar, getGitUrl } from '@/utils/git';
import { getPreviewUrl } from '../utils/git';
import { history } from 'umi'
export default function IndexPage() {
  const [name, setName] = useState("")

  const [init, setInit] = useState(false);
  const [componentList, setComponentList] = useState([])
  useEffect(() => {
    console.log("---")
    if (!init) {
      setInit(true);
      getComponentList({ name }).then(({ data }) => {
        setComponentList(data);
      }, (error) => {
        console.error(error);
        setComponentList([])
      });
    }
  }, [init, name]);

  function getLastPreviewUrl(component: { versions: any[]; classname: any; }) {

    const lastVersion = component.versions[0];
    const examplePath = lastVersion.example_path;
    const exampleFile = JSON.parse(lastVersion.example_list)[0];
    return getPreviewUrl({ name: component.classname, version: lastVersion.version, path: examplePath, file: exampleFile })
  }
  return (
    <div className={styles.container}>
      <div className={styles.search}> <Search style={{ width: '50%' }} placeholder="请输入组件名称" onSearch={(result: string) => {
        setName(result)
        setInit(false)
        console.log(result);
      }} enterButton /></div>

      <Divider></Divider>
      <Row gutter={[{ xs: 8, sm: 16, md: 24 }, 12]}>
        {
          componentList.map((component: any) => {
            return (
              <Col className={styles.componentItem} key={component.id}>
                <Card
                  style={{ width: 440 }}

                  actions={[
                    <EyeOutlined key="eye" onClick={() => {
                      window.open(getLastPreviewUrl(component))
                    }} />,
                    < EditOutlined key="edit"
                      onClick={() => {
                        history.push({
                          pathname: "/detail",
                          query: {
                            id: component.id,
                          }
                        })
                      }}
                    />,
                    <SettingOutlined key="setting" />,
                    <EllipsisOutlined key="ellipsis" />,
                  ]}
                >
                  <Meta
                    avatar={<img style={getGitAvatar(component)?.style} src={getGitAvatar(component)?.img} onClick={() => window.open(getGitUrl(component))} />}
                    title={component.name}
                    description={component.description}

                  />
                  {/* {component.versions} */}
                </Card>
              </Col>
            )
          })
        }
      </Row>

    </div>
  );
}
