/**
 * @author Marcelo G.
 */
(function ($) {
    $.viaAjaxLite = {
        sendForm: function(selector, callback) {

            var jqElement = $(selector);
            var self = this;

            $(selector + ' input[type="submit"], ' +
              selector + ' button[type="submit"]' ).bind('click', function(event) {
                event.preventDefault();
                self.send({
                    url: jqElement.attr('action'),
                    type: jqElement.attr('method'),
                    data: jqElement.serialize(),
                    target: jqElement.attr('target') || jqElement.attr('rel')
                },
                callback
                );
            });


        },

        load: function(options, callback) {
            this.send(options, callback);
        },

        send: function(options, callback) {
            // enviar consulta

            options = $.extend({type: 'get', data: {}}, options);

            $.ajax({
                url: options.url,
                type: options.type,
                data: options.data,
                success: function(data, textStatus, jqXHR) {
                    // procesar respuesta
                    $(options.target).html(data);
                    return $.isFunction(callback) && callback.call(self, [data, textStatus, jqXHR]);
                },
                beforeSend: function() {
                    $(options.target).html('<div class="progress progress-striped active"><div style="width: 45%" class="progress-bar"></div></div>');
                },
                error: function() {
                    return $.isFunction(callback) && callback.call(self, [data, textStatus, jqXHR]);
                }
            });
        }

    };
}(typeof jQuery === 'function' ? jQuery : this));
