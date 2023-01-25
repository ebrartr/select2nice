
// @ebrar haşlak 2023

(function ($) {

    $.fn.select2nice = function (selectOptions) {

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
        let niceInfoBox = null;// ekrandaki select2 objesinin kopyası alınır ki aynı genişlik vb. stillerle içine kendi custom değerlerimizi yazabilelim

        baseObj = $('#' + settings.selector);
        s2Obj = baseObj.select2(settings.select2Options);
        siblingObj = $($(s2Obj[0].nextSibling)[0]);
        siblingObj.addClass('siblingClassCustom');

        niceInfoBox = getSiblingObjCopy(siblingObj);
        niceInfoBox.addClass('infoBox');
        niceInfoBox.settings = settings;
        niceInfoBox.insertAfter(siblingObj);
        niceInfoBox.refresh = function () {

            siblingObj.find('.select2-search__field').css('width', 'unset');
            siblingObj.find('.select2-search__field').attr('placeholder', baseObj.val().length + ' ' + settings.textSelected);

            if (baseObj.val() && baseObj.val().length) {

                niceInfoBox.addClass("itemSelected");

                var selectedTexts = $('#' + niceInfoBox.settings.selector + ' option:selected').map(function () {
                    return '<span class=&quot;badge bg-info text-dark&quot;>' + $(this).text() + '</span>';
                }).get().join(' ');

                let pulseInfo = $('<a data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-html="true" title="' + selectedTexts + '"><i class="myPulse fadeIn animated float-end bxSecilen"></i></a>');
                pulseInfo.tooltip();

                niceInfoBox.html('<span class="selectedCount">' + baseObj.val().length + '</span> ' + '<span class="textSelected">' + settings.textSelected + '</span>');
                niceInfoBox.append(pulseInfo);
                niceInfoBox.tools.deleteDiv.show();

            } else {

                niceInfoBox.removeClass("itemSelected");
                niceInfoBox.setNotSelected();
                niceInfoBox.tools.deleteDiv.hide();
            }
        }
        niceInfoBox.setNotSelected = function () {
            niceInfoBox.html('<span class="selectedCount">0</span> <span class="textSelected">' + niceInfoBox.settings.textSelected + '</span>');
        }
        niceInfoBox.click(function () {

            siblingObj.show();

            $(this).hide();

            siblingObj.find('.select2-search__field').trigger('click');

        });

        niceInfoBox.tools = getSiblingObjCopy(siblingObj);
        niceInfoBox.tools.addClass('infoBoxTools');
        niceInfoBox.tools.mainDiv = $('<div class="row"></div>');


        // DELETE button start

        niceInfoBox.tools.deleteDiv = $('<div class="col-6 text-center deleteButton"></div>');
        niceInfoBox.tools.deleteIcon = $(`<svg width="16" height="16" fill="currentColor" class="deleteButton" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
</svg>`);
        niceInfoBox.tools.deleteIcon.click(function () {

            baseObj.val('');
            baseObj.trigger('change');
            niceInfoBox.refresh();
        });
        niceInfoBox.tools.deleteDiv.append(niceInfoBox.tools.deleteIcon);
        niceInfoBox.tools.mainDiv.append(niceInfoBox.tools.deleteDiv);
        niceInfoBox.tools.deleteDiv.hide();

        //DELETE button end

        // SELECT ALL button start

        niceInfoBox.tools.selectAllDiv = $('<div class="col-6 text-center selectAllButton"></div>');
        niceInfoBox.tools.selectAllIcon = $(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square-fill" viewBox="0 0 16 16">
  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"></path>
</svg>`);
        niceInfoBox.tools.selectAllIcon.click(function () {

            alert('select all');

        });

        niceInfoBox.tools.selectAllDiv.append(niceInfoBox.tools.selectAllIcon);
        niceInfoBox.tools.mainDiv.append(niceInfoBox.tools.selectAllDiv);

        // SELECT ALL button end

        niceInfoBox.tools.append(niceInfoBox.tools.mainDiv);
        niceInfoBox.tools.insertAfter(niceInfoBox);

        niceInfoBox.refresh();// eğer mevcutta seçili bir select init edilecekse
        siblingObj.hide();

        baseObj.on('select2:close', function () {

            niceInfoBox.refresh();

            niceInfoBox.show();
            siblingObj.hide();
        });

        baseObj.on('select2:select', function () {

            niceInfoBox.refresh();
        });

        baseObj.on('select2:unselect', function () {

            niceInfoBox.refresh();
        });

        //init end

    };

}(jQuery));


function getSiblingObjCopy(siblingObj) {

    var result = siblingObj.clone();

    result.removeClass('select2').removeClass('select2-container').removeClass('select2-container--default').removeClass('siblingClassCustom');
    result.addClass('select2Copy');
    result.html('');

    return result;
}