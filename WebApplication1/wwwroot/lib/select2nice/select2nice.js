
// @ebrar haşlak 2023

(function ($) {

    $.fn.select2nice = function (selectOptions) {

        var settings = $.extend({}, {

            selector: $(this).attr("id"),
            textSelected: "selected"

        }, selectOptions);

        if (!(settings.selector && typeof (settings.selector) === 'string')) {

            alert('Config error!');

            return null;
        }

        //init start


        let baseObj = null;// html select objesidir
        let s2Obj = null;// select2 objesidir
        let siblingObj = null;// select2 objesine karşılık ekrana eklenen objedir
        let siblingCopy = null;// ekrandaki select2 objesinin kopyası alınır ki aynı genişlik vb. stillerle içine kendi custom değerlerimizi yazabilelim

        baseObj = $('#' + settings.selector);
        s2Obj = baseObj.select2();
        siblingObj = $($(s2Obj[0].nextSibling)[0]);
        siblingObj.addClass('siblingClassCustom');

        siblingCopy = siblingObj.clone();
        siblingCopy.settings = settings;
        siblingCopy.addClass('select2Copy');
        siblingCopy.insertAfter(siblingObj);
        
        siblingCopy.refresh = function () {

            siblingObj.find('.select2-search__field').css('width', 'unset');
            siblingObj.find('.select2-search__field').attr('placeholder', baseObj.val().length + ' ' + settings.textSelected);

            if (baseObj.val() && baseObj.val().length) {

                siblingCopy.addClass("itemSelected");

                var selectedTexts = $('#' + siblingCopy.settings.selector + ' option:selected').map(function () {
                    return '<span class=&quot;badge bg-info text-dark&quot;>' + $(this).text() + '</span>';
                }).get().join(' ');

                faSelected = $('<a data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-html="true" title="' + selectedTexts + '"><i class="myPulse fadeIn animated float-end bxSecilen"></i></a>');

                faSelected.tooltip();

                siblingCopy.html('<span class="selectedCount">' + baseObj.val().length + '</span> ' + '<span class="textSelected">' + settings.textSelected + '</span>');
                siblingCopy.append(faSelected);

            } else {

                siblingCopy.removeClass("itemSelected");
                siblingCopy.setNotSelected();
            }
        }
        siblingCopy.setNotSelected = function () {
            siblingCopy.html('<span class="selectedCount">0</span> <span class="textSelected">' + siblingCopy.settings.textSelected + '</span>');
        }

        siblingCopy.refresh();

        siblingObj.hide();

        baseObj.on('select2:close', function () {

            siblingCopy.refresh();

            siblingCopy.show();
            siblingObj.hide();
        });

        baseObj.on('select2:select', function () {

            siblingCopy.refresh();
        });

        baseObj.on('select2:unselect', function () {

            siblingCopy.refresh();
        });

        siblingCopy.click(function () {

            siblingObj.show();

            $(this).hide();

            siblingObj.find('.select2-search__field').trigger('click');

        });

        //init end

    };

}(jQuery));