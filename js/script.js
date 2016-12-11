
$(function () {
  let count = 1,
    values,
    $main = $('.main');
  values = Array(4).fill(0).map(function () {
    return Array(8).fill(0).map(function () {
      return Array(5).fill(0);
    });
  });
  values.forEach(function (char, charIndex) {
    let charValue = values[charIndex];
    let $char = $('<div>').addClass('character');
    let $code = $('<textarea>', {
        id: 'character-code-' + charIndex,
        'readonly': 'readonly'
      })
      .attr('data-clipboard-target', '#character-code-' + charIndex).addClass('character-code');
    let updateCode = function () {
      $code.val('{' +
        charValue.map(function (r) {
          return '0x' + (0x100 + r.reduce(function (val, cur, ind) {
            return (val << 1) + cur;
          }, 0)).toString(16).slice(1);
        }).join(', ') +
        '}');
    }
    char.forEach(function (row, rowIndex) {
      let rowValue = charValue[rowIndex];
      let $row = $('<div>').addClass('character-row');
      row.forEach(function (pixel, pixelIndex) {
        $row.append($('<span>').addClass('character-pixel').on({
          'click': function () {
            if (rowValue[pixelIndex] == 1) {
              $(this).removeClass('on');
              rowValue[pixelIndex] = 0;
            } else {
              $(this).addClass('on');
              rowValue[pixelIndex] = 1;
            }
            updateCode();
          },
          'update': function () {
            if (rowValue[pixelIndex] == 1) {
              $(this).addClass('on');
            } else {
              $(this).removeClass('on');
            }
            updateCode();
          }
        }))
      });
      $char.append($row);
    })
    $char.append($('<div>').addClass('character-code-wrapper').append($code));
    $main.append($char);
    updateCode();
  });
  new Clipboard('.character-code').on('success', function (e) {
    $(e.trigger).parent().addClass('copied');
    setTimeout(function () {
      $(e.trigger).parent().removeClass('copied');
    }, 1200);
    e.clearSelection();
  });
});

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-63336636-1', 'auto');
ga('send', 'pageview');
