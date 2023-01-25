
// @ebrar haşlak 2023

(function ($) {

    $.fn.select2nicenew = function (selectOptions) {

        var settings = $.extend({}, {

            selector: $(this).attr("id"),
            textSelected: "selected",
            select2Options: {
                allowClear: false
            }

        }, selectOptions);

        if (!(settings.selector && typeof (settings.selector) === 'string')) {

            alert('Config error!');

            return null;
        }

        //init start

        let baseObj = null;// html select objesidir
        let s2Obj = null;// select2 objesidir
        let siblingObj = null;// select2 objesine karşılık ekrana eklenen objedir
        let nice = null;// esas div

        baseObj = $('#' + settings.selector);
        s2Obj = baseObj.select2(settings.select2Options);
        siblingObj = $($(s2Obj[0].nextSibling)[0]);
        siblingObj.addClass('siblingClassCustom');

        nice = getSiblingObjCopy(siblingObj);

        // info
        nice.insertAfter(siblingObj);
        nice.mainDiv = $('<table></table>');
        nice.mainDivRow = $('<tr></tr>');
        nice.mainDiv.append(nice.mainDivRow);

        nice.countTd = $(`<td style="width:80px"><span style="color:red" class="badge badge-success infoBadge"><span class="text-primary" style="font-size:large">999</span>seçimimimbenim</span></td>`);

        nice.mainDivRow.append(nice.countTd);

        nice.deleteTd = $('<td style="width:20px"></td>');
        nice.mainDivRow.append(nice.deleteTd);
        nice.deleteIcon = $(`<svg width="16" height="16" fill="currentColor" class="deleteButton" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
</svg>`);
        nice.deleteTd.append(nice.deleteIcon);

        nice.selectAllIcon = $(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square-fill" viewBox="0 0 16 16">
  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"></path>
</svg>`);

        nice.selectAllTd = $('<td style="width:20px"></td>');
        nice.selectAllTd.append(nice.selectAllIcon);
        nice.mainDivRow.append(nice.selectAllTd);

        nice.append(nice.mainDiv);

    };

}(jQuery));


function getSiblingObjCopy(siblingObj) {

    var result = siblingObj.clone();

    result.removeClass('select2').removeClass('select2-container').removeClass('select2-container--default').removeClass('siblingClassCustom');
    result.addClass('select2Copy');
    result.html('');

    return result;
}