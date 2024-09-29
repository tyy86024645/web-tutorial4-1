document.addEventListener('DOMContentLoaded', () => {

    const bookListContainer = document.getElementById('book-list');

    fetch('books.xml')
        .then(response => {
            if (!response.ok) {
                throw new Error('网络响应出错');
            }
            return response.text();
        })
        .then(xmlText => {
            // 解析 XML 字符串
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, 'text/xml');


            const books = xmlDoc.getElementsByTagName('book');

            // 遍历每本书并显示其详细信息
            for (let book of books) {
                const title = book.getElementsByTagName('title')[0].textContent;
                const author = book.getElementsByTagName('author')[0].textContent;
                const price = book.getElementsByTagName('price')[0].textContent;

                // 创建书籍的 div 元素
                const bookDiv = document.createElement('div');
                bookDiv.style.border = '1px solid #ccc';
                bookDiv.style.padding = '10px';
                bookDiv.style.margin = '10px 0';

                // 添加书籍详情到 div
                bookDiv.innerHTML = `<strong>书名：</strong> ${title}<br>
                                     <strong>作者：</strong> ${author}<br>
                                     <strong>价格：</strong> ${price} 元`;

                // 将书籍 div 添加到书籍列表容器
                bookListContainer.appendChild(bookDiv);
            }
        })
        .catch(error => {
            console.error('获取数据时发生问题:', error);
        });
});
