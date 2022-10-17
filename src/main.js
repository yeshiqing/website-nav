let dataWebsite = localStorage.getItem("dataWebsite") || null
let arrHashMap = JSON.parse(dataWebsite) || [
    { logo: "A", url: "https://www.acfun.cn", domain: "acfun.cn" },
    { logo: "B", url: "https://www.bilibili.com", domain: "bilibili.com" }
]
let $lastLi = $('.siteList li:last')


const REG_URL = /(?:https|http):\/\/(?:www\.)*([\w+|\.|\-]+)/;
let simplifyDomain = (url) => {
    return url.match(REG_URL)[1]
}

let map_close2Index = new Map()
{
    // 事件委托
    $('.siteList').on('click', '.close', (e) => {
        e.preventDefault()
        let divClose = e.currentTarget
        let index = $(divClose).data('index')
        arrHashMap.splice(index, 1)
        render()
    })
}
let render = () => {
    $(".siteList").find("li:not(:last)").remove()
    arrHashMap.forEach((node, index) => {
        let $li = $(`<li>
                        <a class="anchor" href="${node.url}">
                            <div class="site">
                                <div class="logo">
                                ${node.logo}
                                </div>
                                <div class="link">${simplifyDomain(node.url)}</div>
                                <div class="close">
                                    <svg class="icon">
                                        <use xlink:href="#icon-close"></use>
                                    </svg>
                                </div>
                            </div>
                        </a>
                    </li>`)
        let $close = $li.insertBefore($lastLi).find('.close').data('index', index);
    })
}
render()

$('.addButton').on('click', (e) => {
    let urlInput = window.prompt('请输入添加的站点网址：');
    if (urlInput === null) {
        return
    }

    let urlReal = ""
    if (urlInput.indexOf('http') === 0) {
        urlReal = urlInput
    } else {
        urlReal = "https://" + urlInput
    }


    let domain = simplifyDomain(urlReal)
    let logo = domain[0]
    arrHashMap.push({
        logo: logo.toUpperCase(),
        url: urlReal,
        domain: domain
    })
    render()
})

window.onbeforeunload = () => {
    let str_data = JSON.stringify(arrHashMap)
    localStorage.setItem("dataWebsite", str_data)
}