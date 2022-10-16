let dataWebsite = localStorage.getItem("dataWebsite") || null;
let arrHashMap = JSON.parse(dataWebsite) || [
    {
        logo: "A",
        logoType: "text",
        url: "https://www.acfun.cn",
        domain: "acfun.cn"
    },
    {
        logo: "./images/bilibili.png",
        logoType: "img",
        url: "https://www.bilibili.com",
        domain: "bilibili.com"
    }
];
let $lastLi = $(".siteList li:last");
let render = ()=>{
    arrHashMap.forEach((node)=>{
        let logo = "";
        if (node.logoType === "img") logo = `<img src="${node.logo}" alt="${node.domain}">`;
        else if (node.logoType === "text") logo = node.logo;
        let $li = $(`<li>
                        <a href="${node.url}">
                            <div class="site">
                                <div class="logo">
                                ${logo}
                                </div>
                                <div class="link">${node.domain}</div>
                            </div>
                        </a>
                    </li>`);
        $li.insertBefore($lastLi);
    });
};
render();
$(".addButton").on("click", (e)=>{
    let urlInput = window.prompt("请输入添加的站点网址：");
    let urlReal = "";
    if (urlInput.indexOf("http") === 0) urlReal = urlInput;
    else urlReal = "https://" + urlInput;
    let reg = /https:\/\/(?:www\.)*([(?:\w+)|\.|\-]+)/gi;
    let domain = reg.exec(urlReal)[1];
    let logo = domain[0];
    $(".siteList").find("li:not(:last)").remove();
    arrHashMap.push({
        logo: logo.toUpperCase(),
        logoType: "text",
        url: urlReal,
        domain: domain
    });
    render();
});
window.onbeforeunload = ()=>{
    localStorage.setItem("dataWebsite", JSON.stringify(arrHashMap));
};

//# sourceMappingURL=index.de158e3a.js.map
