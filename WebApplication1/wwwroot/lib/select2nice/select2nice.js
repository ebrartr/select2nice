
// @ebrar haşlak 2023

(function ($) {

    $.fn.select2nice = function (selectOptions) {

        var settings = $.extend({}, {

            selector: $(this).attr("id"),
            textSelected: "selected",
            select2Options: {
                allowClear:false
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

        niceInfoBox = siblingObj.clone();
        niceInfoBox.settings = settings;
        niceInfoBox.addClass('select2Copy');
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

            } else {

                niceInfoBox.removeClass("itemSelected");
                niceInfoBox.setNotSelected();
            }
        }
        niceInfoBox.setNotSelected = function () {
            niceInfoBox.html('<span class="selectedCount">0</span> <span class="textSelected">' + niceInfoBox.settings.textSelected + '</span>');
        }

        niceInfoBox.refresh();

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

        niceInfoBox.click(function () {

            siblingObj.show();

            $(this).hide();

            siblingObj.find('.select2-search__field').trigger('click');

        });

        //init end

    };

}(jQuery));