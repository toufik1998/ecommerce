import "@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css";
import "./css/style.css";
import 'bootstrap';
import "jquery/dist/jquery";
import "popper.js/dist/popper";
import "bootstrap/dist/js/bootstrap";
import "@fortawesome/fontawesome-free/js/all";

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

});