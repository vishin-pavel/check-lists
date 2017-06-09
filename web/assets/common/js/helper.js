 //Функция выравнивания дивов
function setEqualHeight(columns) {
    var tallestcolumn = 0;
    columns.each(
        function () {
            currentHeight = $(this).height();
            if (currentHeight > tallestcolumn) {
                tallestcolumn = currentHeight;
            }
        }
    );
    columns.height(tallestcolumn);
}
$(document).ready(function () {
    setEqualHeight($(".info-title > section"));
});


//удаление прикрепленного документа
var fileBlockConstructor = function($el){
    this.$el = $el;
    this.deleteFile = function(file){
        swal({
                title: "Вы уверены?",
                text: "Файл будет удален без возможности восстановления",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Удалить",
                cancelButtonText: "Отмена",
                closeOnConfirm: false,
            },
            function (isConfirm) {
                if (isConfirm) {
                    swal({
                        title: "Файл удален",
                        type: "success",
                        confirmButtonClass: "btn-success"
                    });
                    $(file).parent().remove();
                }
            }
        );
    };
    $(".file>i", $el).click(this, function (event){
        event.data.deleteFile($(event.currentTarget))
    }, this);
};


//изменение цвета ячейки названия вопроса (при клике)
 var statusQuestionConstructor = function ($el) {
     this.$el = $el;
     this.swichColorStatusQuestion = function (questionRadioElement) {
         var elClass = $(questionRadioElement).attr('class');
         var numberElClass = parseInt(elClass.replace(/\D+/g,""));
         var currentClass = $(questionRadioElement).parents('tr.question').attr('data-current-answer');

         $(questionRadioElement).parents('tr.question').removeClass(currentClass).addClass('answer' + numberElClass);
         $(questionRadioElement).parents('tr.question').attr('data-current-answer', 'answer' + numberElClass);
     };
     var tr = $(":radio", $el).click(this, function (event) {
         event.data.swichColorStatusQuestion(event.currentTarget)
     });
 };