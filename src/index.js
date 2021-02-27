import "@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css";
import "./css/style.css";
import 'webpack-jquery-ui';
import 'webpack-jquery-ui/css';
import 'bootstrap';
import "jquery/dist/jquery";
import "popper.js/dist/popper";
import "bootstrap/dist/js/bootstrap";
import "@fortawesome/fontawesome-free/js/all";
import 'jquery-ui-touch-punch/jquery.ui.touch-punch';

$(document).ready(function(){

    $("[data-toggle='tooltip']").tooltip();

    $(".add-to-cart-btn").click(function(){
        alert("اضيف المنتج الى عربة الشراء");
    });

    $("#copyright").text("جميع الحقوق محفوظة للمتجر لسنة " + new Date().getFullYear());

    $(".product-option input[type='radio']").change(function(){
        $(this).parents(".product-option").siblings().removeClass("active");
        $(this).parents(".product-option").addClass("active");
    });

    //عندما تتغير كمية المنتج
    $('[data-product-quantity]').change(function(){

        //اجلب الكمية الجديدة
        var newQuantity = $(this).val();

        //ابحث عن السطر الدي يحتوي معلومات هادا المنتج
        var parent = $(this).parents('[data-product-info]');

        //اجلب سعر القطعة الواحدة من معلومات المنتج
        var PricePerUnit = parent.attr('data-product-price');

        // السعر الاجمالي للمنتج هو ثمن القطعة مضروبا بعددها
        var totalPriceForProduct = newQuantity * PricePerUnit;

        //عين السعر الجديد للمنتج ضمن خلية السعر الاجمالي 
        parent.find(".total-price-for-product").text(totalPriceForProduct + '$');

        // حدث السعر الاجمالي لكل المنتجات
        calculateTotalPrice();
    });

    $('[data-remove-from-cart]').click(function(){
        $(this).parents('[data-product-info]').remove();
        //  اعد حساب السعر الاجمالي بعد حدف احد المنتجات
        calculateTotalPrice();
    })

    function calculateTotalPrice(){
        // انشئ متغيرا جديدا لحفظ السعر الاجمالي
        var totalPriceForAllProduct = 0;

        // لكل سطر يمثل معلومات المنتج ضمن الصفحة
        $('[data-product-info]').each(function(){

            // اجلب سعر القطعة الواحدة من الخاصية الموافقة
            var PricePerUnit = $(this).attr('data-product-price');

            //  اجلب كمية المنتج من حقل اختيار الكمية
            var quantity = $(this).find('[data-product-quantity]').val();

            var totalPriceForProduct = PricePerUnit * quantity;

            //  اضف السعر الاجمالي لهادا المنتج واضفه الى السعر الاجمالي لكل المنتجات  واحفظ هاته القيمة ضمن هادا المتغير نفسه
            totalPriceForAllProduct = totalPriceForAllProduct + totalPriceForProduct; 
        });

        //   السعر الاجمالي لكل المنتجات التي اختارها المستخدم ضمن الصفحة
        $("#total-price-for-all-products").text(totalPriceForAllProduct + '$');
    }

    var citiesByCountry = {
        sa: ['جدة', 'الرياض'],
        ma: ['مراكش', 'فاس'],
        jo: ['عمان', 'الزرقاء'],
        om: ['السلطنة', 'خربين']
    };

    //عندما يتغير البلد
    $('#form-checkout select[name="country"]').change(function(){

        //  اجلب رمز البلد
        var country = $(this).val();

        //  اجلب مدن هادا البلد من المصفوفة
        var cities = citiesByCountry[country];

        // فرغ قائمة المدن
        $('#form-checkout select[name="city"]').empty();

        //  اضافة خيار اختر مدينة
        $('#form-checkout select[name="city"]').append(
            '<option disabled selected value="">اختر المدينة</option>'
        );

        // اضف المدن  الى قائمة المدن
        cities.forEach(function(city){
            var newOption = $('<option></option>');
            newOption.text(city);
            newOption.val(city);
            $('#form-checkout select[name="city"]').append(newOption);
        });
    });

    // عندما تتغير طريقة الدفع
     $('#form-checkout input[name="payment_method"]').change(function(){

        //اجلب القيمة المختارة حاليا
        var paymentMethod = $(this).val();

        if (paymentMethod === 'on_delivery'){

            // ادا كانت عند الاستلام فقم بتعطيل حقول بطاقة الائتمان
            $("#credit-card-info input").prop('disabled', true);

        }else{
            // والا قم بتفعيلها
            $("#credit-card-info input").prop('disabled', false);
        }

        // بدل معلومات بطاقة الائتمان بين الظهور والاخفاء
        $("#credit-card-info").toggle();
     });

     // مكون البحث حسب السعر
     $("#price-range").slider({
         range: true,
         min: 50,
         max: 1000,
         step: 50,
         values: [250, 800],
         slide: function(event, ui){
             $("#price-min").text(ui.values[0]);
             $("#price-max").text(ui.values[1]);
         }
     });


});