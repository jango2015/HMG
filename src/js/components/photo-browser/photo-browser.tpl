<div class="weui-photo-browser-modal">
    <div class="swiper-container">
        <div class="swiper-wrapper">
            {{#items}}
            <div class="swiper-slide">
                <div class="photo-container">
                    <img src="{{image}}" />
                </div>
            </div>
            {{/items}}
        </div>
        <div class="caption">
            {{#items}}
            <div class="caption-item caption-item-{{@index}}">{{caption}}</div>
            {{/items}}
        </div>
        <div class="swiper-pagination"></div>
    </div>
</div>