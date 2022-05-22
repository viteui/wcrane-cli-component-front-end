import moment from "moment";
export const formatNow = (timestamp: string) => {
    console.log(timestamp);
    const data = new Date(+timestamp);
    return moment(data).fromNow()
}

export const formatName = (name: string) => {
    // 处理name
    if (name.startsWith('@') && name.indexOf('/') > 0) {
        // wcrane-cli-dev/component-test --> wcrane-cli-dev_component-test
        const nameArray = name.split('/');
        name = nameArray.join('_').replace('@', '')
    } else {
        name = name; // 项目名称
    }

    return name;
}

export function copy(text: string) {
    const input = document.createElement('input');

    input.value = text;

    document.body.append(input);
    input.select();
    document.execCommand('Copy');

    input.className = 'input';
    input.style.display = 'none'
}