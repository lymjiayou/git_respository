/**
 * Created by MY on 2019/6/20.
 */
$(function () {
    //  $.ajax({
    //      type: "get",
    //      url: http+"category",
    //      async: true,
    //      success: function (select_data) {
    //          //思想：首先获得最外层的一级分类 索引号按照最外层来 根据所点击li的索引值，来找到该li下面的childCategory
    //          var first = select_data.data;
    //          // console.log(first)
    //          // console.log(first);
    //          // var str_first = JSON.stringify(select_data);
    //          var all='<li class="selected">'+'<a href="#">'+'全部'+'</a>'+'</li>';
    //          // window.sessionStorage.obj_json = str_first;
    //          // 每一个li的位置都放了第一层分类的数据，同时第一层分类里面也都包含childCategory，其实，只要找到点击的是哪一个li
    //          // 获得下面的下一级childCategory就能实现联动
    //          for(var i=0;i<first.length;i++){
    //              var first_li="<li class='first_li' self_id='i_"+first[i].id+"'>"+"<a>"+first[i].categoryName+"</a>"+"</li>";
    //              $(".goods_first_list").append(first_li);
    //          }
    //          if(first_id!=""&&second_id!=""&&third_id!=""){
    //              $("li[self_id='i_"+first_id+"']").addClass("selected").siblings().removeClass("selected");
    //              third_category(first_index,second_index,second_id,third_id);
    //
    //          }else if(first_id!=""&&second_id!=""){
    //              $("li[self_id='i_"+first_id+"']").addClass("selected").siblings().removeClass("selected");
    //              // $(".third_category").hide()
    //              second_category(first_index,second_id);
    //          }else if(first_id!=""){
    //              $("li[self_id='i_"+first_id+"']").addClass("selected").siblings().removeClass("selected");
    //              $(".second_category").hide();
    //              $(".third_category").hide();
    //          }
    //
    //          var lis1=$(".first_li");
    //          // console.log(lis1)
    //          lis1.each(function (index,ele) {
    //              $(ele).click(function () {
    //                  category_id=$(this).attr("self_id").split("_")[1];
    //                  show_list(category_id)
    //                  $(".second_category").show().slideDown(200);
    //                  $(".third_category").hide();
    //                  $(this).addClass("selected").siblings().removeClass("selected");
    //                  // 通过index来确定当前选择的是哪个li
    //                  second=first[index].childCategory ;
    //                  if(second.length>0){
    //                      $(".goods_second_list").empty();
    //                      $(".goods_second_list").html(all);
    //                      for (var i=0;i<second.length;i++){
    //                          var second_li="<li class='second_li' self_id='i_"+second[i].id+"'>"+"<a>"+second[i].categoryName+"</a>"+"</li>";
    //                          $(".goods_second_list").append(second_li);
    //
    //                      }
    //                      var lis2=$(".second_li");
    //                      // console.log(lis2)
    //                      lis2.each(function (i,el) {
    //                          $(el).on("click",function () {
    //                              console.log(555555)
    //                              category_id=$(this).attr("self_id").split("_")[1];
    //                              show_list(category_id)
    //                              $(".third_category").show().slideDown(200);
    //                              $(this).addClass("selected").siblings().removeClass("selected");
    //                              var third=second[i].childCategory;
    //                              if (third.length>0){
    //                                  $(".goods_third_list").empty();
    //                                  $(".goods_third_list").html(all);
    //                                  for (var j=0;j<third.length;j++){
    //                                      var third_li="<li class='third_li' self_id='i_"+third[j].id+"'>"+"<a>"+third[j].categoryName+"</a>"+"</li>";
    //                                      $(".goods_third_list").append(third_li);
    //                                  }
    //                                  var lis3=$(".third_li");
    //                                  lis3.each(function (j,e) {
    //                                      $(e).on("click",function () {
    //                                          category_id=$(this).attr("self_id").split("_")[1];
    //                                          show_list(category_id)
    //                                          $(this).addClass("selected").siblings().removeClass("selected");
    //                                      })
    //                                  })
    //                              }else {
    //                                  //如果当前所选的二级分类没有childCategory（没有三级分类）  则隐藏三级分类显示部分
    //                                  $(".third_category").hide();
    //                              }
    //                          })
    //                      })
    //
    //                  }else {
    //                      //如果当前所选的一级分类没有childCategory（没有二级分类）  则隐藏er级分类显示部分
    //                      $(".second_category").hide();
    //                  }
    //              })
    //
    //          })
    //
    //
    //
    //      }
    //  });
})