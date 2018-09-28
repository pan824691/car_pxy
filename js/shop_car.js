var shopCar = (function(){
    
    return {
        init:function(ele){
             this.$ele = document.querySelector(ele);
             this.event();
             this.getShopList();
        },
        // 事件函数
        event:function(){
            var _this = this;
            this.$ele.oninput = function(e) {
                if(e.target.className == 'shop-count') {
                    // 获取商品总价
                    var _parent =  e.target.parentNode
                    // console.log(e.target.value,_parent.querySelector('.shop-price'));
                    _parent.querySelector('.shop-total').innerHTML = e.target.value * _parent.querySelector('.shop-price').innerHTML;

                }
            }
        },
        // 获取商品数据
        getShopList:function(){
           var _this = this;
           params = {
               url:'json/list.json',
               success:function(data){
                //    console.log(data)
                   _this.shopList = data.data; // data.data 是因为前面传过来的json数据有个msg头，和data，data.data是要拿到里面的data数据
                   _this.getCar();
                   
               }
           }
           sendAjax(params)
        },
        // 获取购物车数据
        getCar:function(){
             this.carShopList = JSON.parse(localStorage.shopList || '[]') // 购物车数据是字符串形式，要转成对象；
             this.inserData(this.carShopList)// 执行渲染购物车数据
        },
        // 渲染购物车数据
        inserData:function(data){
            // console.log(this.shopList)  // 
            // data = data.data;
             console.log(data)
            var arr = [];
            for(var i = 0; i < data.length; i++){
                var shop;
                for(var j = 0; j < this.shopList.length; j++){
                    if(this.shopList[j].id == data[i].id){  //  this.shopList存储在本地的商品信息，data是传过来的商品信息
                        shop = this.shopList[j];  //商品存在就等于本地的商品
                        break;
                    }
                }
                arr.push(`
                <div>
                    商品名称:<span class="shop-name">${shop.name}</span><br />
                    数量: <input class="shop-count" type="number" value="${shop.couct}" /><br />
                    价格: <span class="shop-price">${shop.price}</span><br />
                    商品总价: <span class="shop-total">${shop.price * data[i].couct}</span>
                    商品提示: <span class="shop-tip">${shop.ps}</span>
                    <button class="btn shop-btn-del" attr-id="${data[i].id}">删除</button>
                </div>
                `)
            }
            this.$ele.innerHTML = arr.join('');
        }
    }

}())