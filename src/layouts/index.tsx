
import { ReactChild, ReactFragment, ReactPortal, useState } from 'react'
import { useEffect } from 'react'
import { getSiteInfo } from '../service'
import styles from './index.less'
function BasicLayout(props: { children: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined }) {
    const [init, setInit] = useState(false)
    const [slogan, setSlogan] = useState("");
    const [copyright, setCopyright] = useState("")
    const [link, setLink] = useState("")
    useEffect(() => {
        if (!init) {
            setInit(true);
            getSiteInfo().then(({ data }: { data: { copyright: string, link: string, slogon: string } }) => {
                setSlogan(() => data.slogon);
                setCopyright(() => data.copyright);
                setLink(() => data.link);
            }, console.log)
        }
    }, [init])
    return (
        <div className={styles.normal}>
            <div className={styles.title}>{slogan}</div>
            {props.children}
            <div className={styles.footer} ><a href={link} className={styles.footerLink} target="_blank">{link}</a> {copyright}</div>
        </div>
    )
}

export default BasicLayout