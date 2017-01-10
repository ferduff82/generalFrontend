tccc.initComponent('.stock-ticker', [], function (instances, tccc) {
    instances.each(function () {
        var $this = $(this);
        (function () {
            StockTicker = function () {
                this.price = "";
                this.delta = "";
                this.direction = "";
                this.url = $this.data('url');
            };

            StockTicker.prototype = {
                constructor : StockTicker,
                getData : function () {
                    $.ajax({
                        method: 'get',
                        datatype: 'json',
                        cache: 'false',
                        url : this.url,
                        success: function (data) {
                            if ((data !== null) && (data !== undefined) && (data !== '')) {
                                var values = data;
                                this.price = values.price !== undefined ? values.price : '';
                                this.delta = values.delta !== undefined ? values.delta : '';
                                this.direction = values.trend;
                                $this.find('.price').text('$' + this.price);
                                
                                if (this.direction) {
                                    $('.delta').html(this.delta + ' <span class="icon-chevron icon-sort-' + this.direction + '"></span></div>');
                                } else {
                                    $('.delta').html(this.delta + '</div>');
                                }

                                $('.delta').removeClass('up');
                                $('.delta').removeClass('down');
                                $('.delta').addClass(this.direction);
                                
                            } else {
                                $this.find('.price').text('$');
                            }
                        },
                        error: function () {
                            $this.find('.price').text('$');
                        }
                    });
                }
            };
        })();

        var stockTicker = new StockTicker();
        stockTicker.getData();
        setInterval(function () {
            stockTicker.getData();
        }, 7000);
    });
});