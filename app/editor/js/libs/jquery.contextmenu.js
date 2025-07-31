/**
 * jQuery plugin for Pretty looking right click context menu.
 *
 * Requires popup.js and popup.css to be included in your page. And jQuery, obviously.
 *
 * Usage:
 *
 *   $('.something').contextPopup({
 *     title: 'Some title',
 *     items: [
 *       {label:'My Item', icon:'/some/icon1.png', action:function() { alert('hi'); }},
 *       {label:'Item #2', icon:'/some/icon2.png', action:function() { alert('yo'); }},
 *       null, // divider
 *       {label:'Blahhhh', icon:'/some/icon3.png', action:function() { alert('bye'); }, isEnabled: function() { return false; }},
 *     ]
 *   });
 *
 * Icon needs to be 16x16. I recommend the Fugue icon set from: http://p.yusukekamiyamane.com/ 
 *
 * - Joe Walnes, 2011 http://joewalnes.com/
 *   https://github.com/joewalnes/jquery-simple-context-menu
 *
 * MIT License: https://github.com/joewalnes/jquery-simple-context-menu/blob/master/LICENSE.txt
 */
jQuery.fn.contextPopup = function(menuData) {
	// Define default settings
	var settings = {
		contextMenuClass: 'contextMenuPlugin',
        linkClickerClass: 'contextMenuLink',
		gutterLineClass: 'gutterLine',
		headerClass: 'header',
		seperatorClass: 'divider',
		title: '',
		items: []
	};
	
	// merge them
	$.extend(settings, menuData);

  // Build popup menu HTML
  function createMenu(e, parentMenu) {
    var menu = $('<ul class="' + settings.contextMenuClass + '"><div class="' + settings.gutterLineClass + '"></div></ul>')
      .appendTo(document.body);
    if (settings.title && !parentMenu) {
      $('<li class="' + settings.headerClass + '"></li>').text(settings.title).appendTo(menu);
    }
    settings.items.forEach(function(item) {
      if (item) {
        var hasSubmenu = item.items && Object.keys(item.items).length > 0;
        var rowCode = '<li><a href="#" class="'+settings.linkClickerClass+'"><span class="itemTitle"></span>' + 
                      (hasSubmenu ? '<span class="submenu-arrow">►</span>' : '') + '</a></li>';
        var row = $(rowCode).appendTo(menu);
        
        if(item.icon){
          var icon = $('<img>');
          icon.attr('src', item.icon);
          icon.insertBefore(row.find('.itemTitle'));
        }
        row.find('.itemTitle').text(item.label);
        
        if (hasSubmenu) {
          row.addClass('has-submenu');
          // Create submenu
          var submenu = createSubmenu(item.items, row);
          row.append(submenu);
          
          // Handle submenu show/hide on hover
          row.on('mouseenter', function() {
            $('.contextMenuPlugin .submenu').hide();
            submenu.show();
            positionSubmenu(submenu, row);
          });
          
          row.on('mouseleave', function(e) {
            var relatedTarget = e.relatedTarget;
            if (!submenu.is(relatedTarget) && !submenu.has(relatedTarget).length) {
              submenu.hide();
            }
          });
          
          submenu.on('mouseleave', function(e) {
            var relatedTarget = e.relatedTarget;
            if (!row.is(relatedTarget) && !row.has(relatedTarget).length) {
              submenu.hide();
            }
          });
        }
          
        if (item.isEnabled != undefined && !item.isEnabled()) {
            row.addClass('disabled');
        } else if (item.action && !hasSubmenu) {
            row.find('.'+settings.linkClickerClass).click(function () { item.action(e); });
        }

      } else {
        $('<li class="' + settings.seperatorClass + '"></li>').appendTo(menu);
      }
    });
    menu.find('.' + settings.headerClass ).text(settings.title);
    return menu;
  }

  // Create submenu
  function createSubmenu(items, parentRow) {
    var submenu = $('<ul class="' + settings.contextMenuClass + ' submenu"><div class="' + settings.gutterLineClass + '"></div></ul>');
    
    Object.keys(items).forEach(function(key) {
      var item = items[key];
      if (item) {
        var rowCode = '<li><a href="#" class="'+settings.linkClickerClass+'"><span class="itemTitle"></span></a></li>';
        var row = $(rowCode).appendTo(submenu);
        
        if(item.icon){
          var icon = $('<img>');
          icon.attr('src', item.icon);
          icon.insertBefore(row.find('.itemTitle'));
        }
        row.find('.itemTitle').text(item.label);
          
        if (item.isEnabled != undefined && !item.isEnabled()) {
            row.addClass('disabled');
        } else if (item.action) {
            row.find('.'+settings.linkClickerClass).click(function (e) { 
              item.action(e); 
              // Close all menus when submenu item is clicked
              $('.contextMenuPlugin').remove();
              $('.contextMenuPlugin-bg').remove();
            });
        }
      } else {
        $('<li class="' + settings.seperatorClass + '"></li>').appendTo(submenu);
      }
    });
    
    return submenu;
  }
  
  // Position submenu relative to parent item
  function positionSubmenu(submenu, parentRow) {
    var parentWidth = parentRow.outerWidth();
    var submenuWidth = submenu.outerWidth();
    var windowWidth = $(window).width();
    var parentOffset = parentRow.offset();
    
    // Default position: to the right of parent
    var left = '100%';
    var top = '0';
    
    // Check if submenu would go off right edge of screen
    if (parentOffset.left + parentWidth + submenuWidth > windowWidth) {
      left = '-100%'; // Position to the left instead
    }
    
    submenu.css({
      position: 'absolute',
      left: left,
      top: top,
      zIndex: 1000002
    });
  }

  // On contextmenu event (right click)
  this.on('contextmenu', function(e) {
	
    var menu = createMenu(e)
      .show();
    
	contextmenuEventsFabric();
	
    var left = e.pageX + 5, /* nudge to the right, so the pointer is covering the title */
        top = e.pageY;
    if (top + menu.height() >= $(window).height()) {
        top -= menu.height();
    }
    if (left + menu.width() >= $(window).width()) {
        left -= menu.width();
    }
	top = top - 10;
    // Create and show menu
    menu.css({zIndex:1000001, left:left, top:top})
      .on('contextmenu', function() { return false; });

    // Cover rest of page with invisible div that when clicked will cancel the popup.
    var bg = $('<div class="contextMenuPlugin-bg"></div>')
      .css({left:0, top:0, width:'100%', height:'100%', position:'absolute', zIndex:1000000})
      .appendTo(document.body)
      .on('contextmenu click', function() {
        // If click or right click anywhere else on page: remove clean up.
        bg.remove();
        $('.contextMenuPlugin').remove();
        return false;
      });

    // When clicking on a link in menu: clean up (in addition to handlers on link already)
    menu.find('a').click(function() {
      bg.remove();
      $('.contextMenuPlugin').remove();
    });

    // Cancel event, so real browser popup doesn't appear.
    return false;
  });

  return this;
};

