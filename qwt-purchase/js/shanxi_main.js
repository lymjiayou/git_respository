$(function () {
    var oProvince = service_city;
    // 遍历省份名添加到到第一级下拉菜单，设置自定义属性num作为索引号
    // for (i in oProvince) {
    //   $('.province').append('<option value=' + oProvince[i]['name'] + ' num=' + j + '>' + oProvince[i]['name'] +
    //     '</option>');
    //   j++;
    // }


    // $('.province').change(function () {
    //
    //   //确认选中的了省份名，否则会报错undefined
    //   if ($(this).val()) {
    //
    //     // 获取省份索引号
    //       console.log($('.province option:selected').val());
    //     var fir_idx = $('.province option:selected').attr('num')-1;
    //
    //     // 当前选中的省份对应的第二级城市列表json对象
    //
    //
    //     //先清空再写入
    //     $('.city').empty();
    //     $('.area').empty();
    //
    //     //写入提示行
    //     $('.city').append('<option value="0">-请选择-</option>');

    for( j in oProvince){
         $('.province').append('<option value=' + oProvince[i]['name'] + '>'  + oProvince[i]['name'] +  '</option>');
    }
    var k = 1;
    var oCity = oProvince[0]['city'];
    // 遍历对应的城市名到第二级下拉菜单
    for (i in oCity) {
        $('.city').append('<option value=' + oCity[i]['name'] + ' num=' + k + '>' + oCity[i]['name'] +
            '</option>');
        k++;
    }
    var oArea = oCity[0]['area'];
    for (i in oArea) {
        $('.area').append('<option value=' + oArea[i] + '>' + oArea[i] + '</option>');
    }

    $('.city').change(function () {

        //确认选中的了城市名，否则会报错undefined
        if ($(this).val()) {

            // 获取城市索引号
            var snd_idx = $('.city option:selected').attr('num') - 1;

            //先清空再写入
            $('.area').empty();

            // //写入提示行
            // $('.area').append('<option value="0">-请选择-</option>');

            // 当前选中的城市对应的第三级区县列表arr对象
            var oArea = oCity[snd_idx]['area'];

            // 遍历对应的区县名到第三级下拉菜单
            for (i in oArea) {
                $('.area').append('<option value=' + oArea[i] + '>' + oArea[i] + '</option>');
            }

        } else {
            //如果选择“-- 请选择城市 --”的option，则清空区县列表
            $('.area').empty();
        }

    });

    // }
    // else {
    //   //如果选择“-- 请选择省份 --”的option，则清空所有
    //   $('.city').empty();
    //   $('.area').empty();
    // }

    // });

});