$(function () {
  const divIds = $.map($("#match_history > div"), (div) => div.id);
  console.log(divIds);
  divIds.forEach((game) => {
    $.ajax({
        type: 'GET', 
        data: { 
            id: game
        },
        url: $SCRIPT_ROOT + "match",
        cache: false,
        async: false,
        success: function(data) {
            $("#" + game).html(data);
        },
    });
  });

  $('.'+summonerid).show()
});
