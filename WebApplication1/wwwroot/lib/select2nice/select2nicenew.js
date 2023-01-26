
// @ebrar haşlak 2023

var niceConsts = {

    deleteIconHtml: `<svg width="16" height="16" fill="currentColor" class="deleteButton" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
</svg>`,
    selectAllIconHtml: `<svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
  <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"></path>
</svg>`,
    pulseTag: '<i class="myPulse animated float-end bxSecilen"></i>'


};

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
        nice.baseObj = baseObj;
        nice.s2Obj = s2Obj;
        nice.siblingObj = siblingObj;
        nice.settings = settings;

        // info
        nice.insertAfter(siblingObj);
        nice.addClass('nice')
        nice.mainDiv = $('<table data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-html="true" class="nice-table nice-tooltip"></table>');
        nice.mainDivRow = $('<tr></tr>');
        nice.mainDiv.append(nice.mainDivRow);

        nice.countTd = $(`<td style="width:60px"></td>`);
        nice.countTdSpan = $('<span class="text-primary"></span>');
        nice.countTd.append(nice.countTdSpan);
        nice.countTdSpan.html('0');
        nice.mainDivRow.append(nice.countTd);

        nice.mainDivRow2 = $('<tr></tr>');
        nice.mainDiv.append(nice.mainDivRow2);
        nice.messageTd = $(`<td class="nice-message-td" colspan="4" style="text-align:center"></td>`);
        nice.messageTdSpan = $('<span class="nice-message-td-span text-primary text-center"></span>');
        nice.messageTd.append(nice.messageTdSpan);
        nice.messageTdSpan.html(settings.textSelected);
        nice.mainDivRow2.append(nice.messageTd);

        nice.pulseTd = $('<td style="width:20px"></td>');
        nice.pulseTd.aTag = $('<a></a>');
        nice.pulseTd.iTag = $(niceConsts.pulseTag);
        nice.pulseTd.aTag.append(nice.pulseTd.iTag);
        nice.pulseTd.append(nice.pulseTd.aTag);
        nice.mainDivRow.append(nice.pulseTd);

        nice.deleteTd = $('<td style="width:20px"></td>');
        nice.mainDivRow.append(nice.deleteTd);
        nice.deleteIcon = $(niceConsts.deleteIconHtml);
        nice.deleteTd.append(nice.deleteIcon);

        nice.selectAllIcon = $(niceConsts.selectAllIconHtml);
        nice.selectAllIcon.addClass('nice-selectall-icon');
        nice.selectAllTd = $('<td style="width:20px"></td>');
        nice.selectAllTd.append(nice.selectAllIcon);
        nice.mainDivRow.append(nice.selectAllTd);

        nice.showPulse = function () {

            nice.pulseTd.iTag.show();
        }

        nice.hidePulse = function () {

            nice.pulseTd.iTag.hide();
        }

        nice.showDeleteIcon = function () {
            nice.deleteIcon.show();
        }

        nice.hideDeleteIcon = function () {
            nice.deleteIcon.hide();
        }

        nice.siblingShow = function () {
            nice.siblingObj.show();
        }

        nice.siblingHide = function () {
            nice.siblingObj.hide();
        }

        nice.siblingClick = function () {
            nice.siblingObj.find('.select2-search__field').trigger('click');
        }

        nice.notSelected = function () {
            nice.countTdSpan.html('0');
        }

        nice.refresh = function () {

            $('.nice-tooltip').tooltip('dispose');
            
            nice.siblingObj.find('.select2-search__field').css('width', 'unset');
            nice.siblingObj.find('.select2-search__field').attr('placeholder', nice.baseObj.val().length + ' ' + nice.settings.textSelected);

            if (nice.baseObj.val() && nice.baseObj.val().length) {

                nice.addClass("itemSelected");

                var selectedTexts = getSelectedTexts(nice.settings.selector);

                nice.mainDiv.prop('title', selectedTexts);
                nice.showPulse();

                nice.countTdSpan.html(nice.baseObj.val().length);
                nice.showDeleteIcon();

            } else {

                nice.removeClass("itemSelected");
                nice.notSelected();
                nice.hideDeleteIcon();
                nice.hidePulse();
                nice.mainDiv.prop('title', ' ');
            }

            $('.nice-tooltip').tooltip();
        }

        nice.click(function () {

            nice.siblingShow();
            nice.hide();
            nice.siblingClick();

        });

        nice.deleteIcon.click(function (e) {

            e.stopPropagation();

            nice.baseObj.val('');
            nice.baseObj.trigger('change');
            nice.refresh();
        });

        nice.selectAllIcon.click(function (e) {

            e.stopPropagation();

            alert('select all');

        });

        nice.append(nice.mainDiv);

        nice.refresh();
        nice.siblingHide();

        nice.baseObj.on('select2:close', function () {

            nice.refresh();

            nice.show();
            nice.siblingHide();
        });

        nice.baseObj.on('select2:select', function () {

            nice.refresh();
        });

        nice.baseObj.on('select2:unselect', function () {

            nice.refresh();
        });

    };

}(jQuery));


function getSiblingObjCopy(siblingObj) {

    var result = siblingObj.clone();

    result.removeClass('select2').removeClass('select2-container').removeClass('select2-container--default').removeClass('siblingClassCustom');
    result.addClass('select2Copy');
    result.html('');

    return result;
}

function getSelectedTexts(selector) {

    var result = $('#' + selector + ' option:selected').map(function () {
        return '<span class="badge bg-info text-dark">' + $(this).text() + '</span>';
    }).get().join(' ');

    return result;

}