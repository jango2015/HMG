<div class="weui_cells weui_cells_radio">
    {{#items}}
    <label class="weui_cell weui_check_label" for="weui-select-id-{{this.title}}">
        <div class="weui_cell_bd weui_cell_primary">
            <p>{{this.title}}</p>
        </div>
        <div class="weui_cell_ft">
            <input type="radio" class="weui_check" name="weui-select" id="weui-select-id-{{this.title}}" value="{{this.value}}" {{#if this.checked}}checked="checked"{{/if}} data-title="{{this.title}}">
            <span class="weui_icon_checked"></span>
        </div>
    </label>
    {{/items}}
</div>