/** ----------------------------------------------------------- *
 *                                                     ____     *
 *      __________      ____     __________           /   /|    *
 *     /   ____   /|   /   /|   /   ____   /|   _____/   /_/__  *
 *    /   /___/  / /  /   / /  /   /___/  / /  /____    _____/| *
 *   /   _______/ /  /   / /  /   _______/ /   |___/   / ____|/ *
 *  /   / ______|/  /   / /  /   / ______|/       /___/ /       *
 * /___/ /         /___/ /  /___/ /               |___|/        *
 * |___|/          |___|/   |___|/                              *
 *                                                              *
 * ------------------------------------------------------------ *
 *                        PIP_BOOTSTRAP                         *
 *                uma reescrita do bootstrap.js                 *
 * ------------------------------------------------------------ *
 *
 * @author:  Andrei Coelho
 * @version: 1.0.0
 * @Licence: MIT License
 *
 * @description: 
 * Este script foi criado para o uso da empresa pluginplus.com.br mas
 * pode ser usado por qualquer um em qualquer algorítimo.
 * Este script é uma rescrita do bootstrap para ampliar o controle
 * e personalização sobre:
 * - Dropdowns
 * - Modals
 * - Buttons
 * Além da criação de outros componetes como:
 * - Mega menus
 * 
 */



/*********************************
 *                               *
 *       *** VARIAVEIS ***       *
 *                               *
 *********************************/

const PIP_CLASSES_DROP = [
    "dropdown",  "dropup", "dropright", "dropleft"
];

const PIP_VALUES_WIDTH_MEGA = [
    50,  100
];

const PIP_FX_DROP = [
    "fadeup",  "fadedown", "fade", "up", "down"
];

var pip_navbar_lis = [];

var pip_width_device = (window.innerWidth > 0) ? window.innerWidth : screen.width;

// FIM DAS VARIAVEIS 



/*********************************
 *                               *
 *        *** FUNÇÕES ***        *
 *                               *
 *********************************/

/**
 * 
 * @funções GERAIS
 * 
 */

var pip_remove_opacity = function (element){
    element.style.opacity = '0.1';
    Array.from(element.children).forEach(function(el){
        el.style.opacity = '0.1';
    });
}


/**
 * 
 * @funções navbar menu
 * 
 */

var pip_navbar  = function(element){
    pip_navbar_lis.push(element);

    let toggle  = element.querySelector('.navbar-toggler');
    let close   = element.querySelector('.navbar-close');
    let content = element.querySelector('.navbar-collapse');

    if(close.length == 0 || toggle.length == 0 || content === null){
        return;
    }
    toggle.addEventListener('click', function(e){
        e.preventDefault();
        content.style.height = 'auto';
        $(content).addClass('show');
        pip_nav_fade_in(content);
        $(this).addClass('collapse');
        $(close).removeClass('collapse');
    })

    close.addEventListener('click', function(e){
        e.preventDefault();
        pip_nav_fade_out(content, $(this), toggle);
        content.style.height = '';
    })
}

var pip_nav_close = function(){
    pip_navbar_lis.forEach(function(nav){
        let toggle  = nav.querySelector('.navbar-toggler');
        let close   = nav.querySelector('.navbar-close');
        let content = nav.querySelector('.navbar-collapse');
        $(content).removeClass('show');
        $(close).addClass('collapse');
        $(toggle).removeClass('collapse');
    })
}

var pip_nav_fade_in = function(contentNav){
    Array.from(contentNav.children).forEach(function(el){
        el.style.opacity = '0';
    });

    let op = 0;

    let interval = setInterval(function(){
        op++;
        if(op == 10){
            Array.from(contentNav.children).forEach(function(el){
                el.style.opacity = '1';
            });
            clearInterval(interval);
        } else {
            Array.from(contentNav.children).forEach(function(el){
                el.style.opacity = '0.'+op;
            });
        }
    }, 40);
}

var pip_nav_fade_out = function(contentNav, btnClose, btnMenu){
    Array.from(contentNav.children).forEach(function(el){
        el.style.opacity = '1';
    });
    let op = 9;
    let interval = setInterval(function(){
        if(op == 0){
            Array.from(contentNav.children).forEach(function(el){
                el.style.opacity = '0';
            });
            $(contentNav).removeClass('show');
            $(btnClose).addClass('collapse');
            $(btnMenu).removeClass('collapse');
            clearInterval(interval);
            Array.from(contentNav.children).forEach(function(el){
                el.style.opacity = '1';
            });
        } else {
            Array.from(contentNav.children).forEach(function(el){
                el.style.opacity = '0.'+op;
            });
        }
        op--;
    }, 10);
}

/**
 * 
 * @funções dropdown
 * 
 */

var pip_set_margin     = function(element, value){
    element.style.marginTop = value+'px';
}

var pip_fx_app         = function (element, fx, timer){

    let pip_fx_pointer_var = [];

    switch (fx) {

        case 'fade':
            pip_remove_opacity(element);
            pip_fx_pointer_var.push('fade');
            break;

        case 'fadeup':
            pip_remove_opacity(element);
            pip_set_margin(element, '10');
            pip_fx_pointer_var.push('fade', 'up');
            break;

        case 'fadedown':
            pip_remove_opacity(element);
            pip_set_margin(element, '-9');
            pip_fx_pointer_var.push('fade', 'down');
            break;
        
        case 'up':
            pip_set_margin(element, '10');
            pip_fx_pointer_var.push('up');
            break;

        case 'down':
            pip_set_margin(element, '-9');
            pip_fx_pointer_var.push('down');
            break;
        default:
            return;
    }

    let pip_fx_control_var = pip_fx_pointer_var.length;

    let intFx = setInterval(function () {
        if(pip_fx_control_var != 0){
            pip_fx_pointer_var.forEach(function(el){
                if(window['pip_fx_'+el+'_drop'](element)){
                    pip_fx_control_var--;
                }
            });
        } else {
            clearInterval(intFx);
        }
    }, timer)
} 

var pip_fx_fade_drop = function (element){

    let newOpacity = parseFloat(element.style.opacity) + 0.1;
    element.style.opacity = newOpacity;

    Array.from(element.children).forEach(function(el){
        el.style.opacity = newOpacity;
    });
    
    return newOpacity == 1;

}

var pip_fx_down_drop = function (element){
    
    let newPx = parseInt(element.style.marginTop.substring(0,2)) + 1;
    
    // WTF - 1
    // a margem tem que ser exatamente 0
    // o código abaixo corrige um bug estranho ...
    // por algum motivo o resultado pode dar maior que 0 na soma
    newPx = newPx > 0 ? 0 : newPx; 

    element.style.marginTop = newPx+'px';

    return newPx == 0;
}

var pip_fx_up_drop   = function (element){
    
    let newPx = parseInt(element.style.marginTop.substring(0,2)) - 1;

    // os mesmos WTFs de cima, só que ao contrário
    newPx = newPx < 0 ? 0 : newPx;
    element.style.marginTop = newPx+'px';

    return newPx == 0; 
}


// recupera valores de fx e fx-time
var pip_get_fx_drop  = function (element){
    let fx, time = "";
    if(element.hasAttribute('pip-fx')){
        fx = element.getAttribute('pip-fx');
    }
    if(element.hasAttribute('pip-fx-time')){
        time = element.getAttribute('pip-fx-time');
    }
    return [fx, time];
}

var pip_on_show = function(element, fx, time = 'normal'){ // executa evento para drop
    
    fx = !PIP_FX_DROP.includes(fx) ? "fade" : fx;
    switch (time) {
        case 'fast':
            time = 20;
            break;
        case 'slow':
            time = 40;
            break;
        case 'normal':
        default:
            time = 30;
    }

    $(element).addClass('show');
    pip_fx_app(element, fx, time);

}

// função para gerar o evento corretamente
// Esta função é para ser usada 
var pip_getEventBy = function(event){
    switch (event) {
        case 'click':
            return 'click';
        case 'hover':
            return 'mouseenter';
        default: return false;
    }
}

// função para gerar o evento no botão do tipo DROP
// pode ser dropup, dropdown, dropleft ou dropright
var pip_dropdown = function(element){
   
    let toggle    = element.querySelector('.dropdown-toggle');
    let elContent = element.querySelector('.dropdown-menu');

    if(toggle === null || elContent === null || !toggle.hasAttribute('pip-event')) return;
    
    let ev  = pip_getEventBy(toggle.getAttribute('pip-event'));
    let fx  = pip_get_fx_drop(elContent);

    toggle.addEventListener(ev, function(e) {
        e.preventDefault();
        if(ev == 'click' && $(toggle).hasClass('pip-has-focus')){
            $(toggle).removeClass('pip-has-focus')
            $(elContent).removeClass('show');
            toggle.blur();
        } else {
            toggle.focus();
            if(ev == 'click') $(toggle).addClass('pip-has-focus')
            if(!$(elContent).hasClass('show'))
            pip_on_show(elContent, fx[0], fx[1]);
        }
    });

    if(ev == 'mouseenter')
    element.addEventListener('mouseleave', function(){
        toggle.blur();
        $(elContent).removeClass('show');
    });

    if(ev == 'click')
    toggle.addEventListener('focusout', function(){
        toggle.blur();
        $(toggle).removeClass('pip-has-focus')
        $(elContent).removeClass('show');
    });

}

// função para mega menu
// esta função altera os elementos a partir da tela
var pip_width_change = function(){
    
    // adiciona as larguras configuradas
    // define o megamenu pela porcentagem indicada

    PIP_VALUES_WIDTH_MEGA.forEach(function(el){
        let divisor = 100 / el;
        Array.from($('.dropdown-menu.mega-menu-'+el)).forEach(function(element){
            if(pip_width_device < 992){
                $(element).css('width', '');
            } else {
                $(element).css('width', (pip_width_device / divisor)+'px');
                let pos = $(element).attr('pip-postition');
                if (typeof pos !== typeof undefined && pos !== false) {
                    $(element).css('left', pos+'px');
                }
            }
        });
    });

}


/**
 * 
 * @funções de botões
 * 
 */

// FIM DAS FUNÇÕES



/*********************************
 *                               *
 * *** DEFINIÇÕES DE EVENTOS *** *
 *                               *
 *********************************/

// adiciona os eventos em botões e divs dropdow, dropup, dropleft e dropright
PIP_CLASSES_DROP.forEach( function(cls) {
    Array.from($('.'+cls)).forEach(function(element){
        pip_dropdown(element);
    })
});

// adiciona os eventos em botões e divs da navbar
Array.from($('.navbar')).forEach(function(element){
    pip_navbar(element);
})

// adiciona o evento de mudança da largura
$(window).on('resize', function() {
  if ($(this).width() != pip_width_device) {
    pip_width_device = $(this).width();
    pip_width_change();
  }
});

pip_width_change();

/** FIM DAS DEFINIÇÕES DOS EVENTOS */