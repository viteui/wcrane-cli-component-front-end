import { formatName } from ".";

export function getGitAvatar(item: { git_type: string; }) {
    const size = "36px"
    if (item.git_type === "gitee") {
        return {
            style: {
                width: size,
                height: size
            },
            img: "https://gitee.com/assets/favicon_message.ico"
        }
    }
    if (item.git_type === "github") {
        return {
            style: {
                width: size,
                height: size
            },
            img: 'https://img1.imgtp.com/2022/05/15/HrProL0H.png'
        }
    }
}

export function getGitUrl(component: { git_type: any; git_login: any; classname: any; }): string {


    return `https://${component.git_type}.com/${component.git_login}/${formatName(component.classname)}`;
}


//获取组件预览链接
export function getPreviewUrl({ name, version, path, file }: { name: string, version: string, path: string, file: any }) {
    name = formatName(name);
    return `https://components.wcrane.cn/${name}@${version}/${path}/${file}`;
}

// 获取组件的npm 仓库
export function getNpmUrl(item: { classname: any; }, version: any) {
    if (version) {
        return `https://www.npmjs.com/package/${item.classname}/v/${version}`
    } else {
        return `https://www.npmjs.com/package/${item.classname}`
    }
}