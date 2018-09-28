var shopList = (function(){
    return {
        init:function(ele){
            this.$ele = document.querySelector(ele);
            this.event();// 执行事件函数
            this.getData();
        },
        event:function(){
            var _this = this;
            this.$ele.addEventListener("click",function(e){
                e = e || window.event;
                var target = e.target || e.srcElement;
                // 给加入购物车按钮添加事件
                if(target.nodeName === "BUTTON" && target.className === 'btn shop-btn-car'){
                    var id = target.getAttribute('attr-id');// 获取商品的id
                    var count = target.parentNode.querySelector('.shop-count').value;  //获取商品数量
                    console.log(count)
                     _this.addCar(id,count)// 获取完商品的id和数量后，执行加入购物车函数
                }
            },false);
        },
        // 获取数据的函数
        getData:function(){
            var _this = this;
            params = {
                url:'json/list.json',
                success:function(data){  // 如果数据获取成功，调用插入数据函数
                    console.log(data)
                    _this.inserData(data)  // 执行函数时要传入数据
                }
            }
            sendAjax(params) // 执行ajax函数
        },
        //渲染数据的函数
        inserData:function(data){
            data = data.data; // data.data 是因为前面传过来的json数据有个msg头，和data，data.data是要拿到里面的data数据
            // console.log(data)
            var arr = [];
            for(var i = 0 ; i < data.length; i++){
                arr.push(`
                <div>
                    商品名称:<span class="shop-name">${data[i].name}</span><br />
                    数量: <input class="shop-count" type="number"  value="1" /><br />
                    价格: <span class="shop-price">${data[i].price}</span><br />
                    <button class="btn shop-btn-car">加入购物车</button>
               </div>
                `)
            }
           this.$ele.innerHTML = arr.join('') // 把渲染的数据拼接到html里面去
        },
        // 添加到购物车的函数
        addCar:function (id,count){
           var shopList = localStorage.shopList || '[]';  // 把商品数据添加到本地，提供给购物车页面使用
           shopList = JSON.parse( shopList);// 拿回来的商品数据是字符串，要转成对象
           for(var j  = 0 ; j < shopList.length; j++){  // 循环商品
               if(shopList[j].id == id){  // 判断商品是否存在，存在让商品数量进行累加
                   shopList[j].count = Number(shopList[j].count) + Number(count);
                   break;
               }
               if(j === shopList.length){  //如果没有过这个商品，重新添加一条
                   shopList.push({id:id,count:count})  // 商品的id等于传数据的id，数量等于传的数量
               }
               localStorage.shopList = JSON.stringify(shopList)  // 再把本地商品转成字符串发出去
           }
        }
    }
}())