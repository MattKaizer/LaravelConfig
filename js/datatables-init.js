$(document).ready(function() {
  // Setup - add a text input to each footer cell
  $('#dataTable tfoot th').each( function () {
      var title = $(this).text();
      $(this).html( title + '<input type="text" placeholder="Buscar '+title+'" />' );
  } );

  // DataTable
  var table = $('#dataTable').DataTable({
    responsive: {
      details: {
          display: $.fn.dataTable.Responsive.display.modal( {
              header: function ( row ) {
                  var data = row.data();
                  return 'Detalles: '+data[0]+' '+data[1];
              }
          } ),
          renderer: $.fn.dataTable.Responsive.renderer.tableAll()
      }
    },
    //dom: 'Bfrtip',
    //    dom: '<"top" Bf> + rt + <row <"col-sm-12 col-md-5" i> <"col-sm-12 col-md-7" p> >',

    dom: '<"row" <"col-md-6" B> <"col-md-6 float-right" f> > + rt + <"row" <"col-sm-12 col-md-5" i> <"col-sm-12 col-md-7" p> >',
    buttons: [
      {
          extend:    'excelHtml5',
          text:      '<i class="fa fa-file-excel"></i>',
          titleAttr: 'Excel'
      },
      {
          extend:    'csvHtml5',
          text:      '<i class="fa fa-file-text"></i>',
          titleAttr: 'CSV'
      },
      {
          extend:    'pdfHtml5',
          text:      '<i class="fa fa-file-pdf"></i>',
          titleAttr: 'PDF'
      },
      {
        extend:    'print',
        text:      '<i class="fa fa-print"></i>',
        titleAttr: 'PDF'
        },
        { extend: 'colvis', className: 'btn btn-primary' },
        //{ extend: 'excel', className: 'btn btn-primary' },
        { extend: 'print', className: 'btn btn-primary' },
        { extend: 'pdf', className: 'btn btn-primary' },
        //{ extend: 'csv', className: 'btn btn-primary' },
        { extend: 'pageLength', className: 'btn btn-primary' },
      ],
      "language": {
        "buttons": {
          "print" : 'Imprimir',
          "colvis": 'Columnas',
          "pageLength": {
              "_": "Mostrar %d",
              "-1": "",
          }
        },
        "search": "Buscar",
        "searchPlaceholder": "Buscar algo...",
        "bPrint":          "Imprimir",
        "sProcessing":     "Procesando...",
        "sLengthMenu":     "Mostrar _MENU_ registros",
        "sZeroRecords":    "No se encontraron resultados",
        "sEmptyTable":     "Ningún dato disponible en esta tabla",
        "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
        "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
        "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
        "sInfoPostFix":    "",
        "sSearch":         "",
        "sUrl":            "",
        "sInfoThousands":  ",",
        "sLoadingRecords": "Cargando...",
        "oPaginate": {
            "sFirst":    "Primero",
            "sLast":     "Último",
            "sNext":     "Siguiente",
            "sPrevious": "Anterior"
        },
        "oAria": {
            "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
        }
      }
  });

  // Apply the search
  table.columns().every( function () {
      var that = this;

      $( 'input', this.footer() ).on( 'keyup change', function () {
          if ( that.search() !== this.value ) {
              that
                  .search( this.value )
                  .draw();
          }
      } );
  } );

  $('a[data-toggle="tab"]').on( 'shown.bs.tab', function (e) {
      $($.fn.dataTable.tables( true ) ).css('width', '100%');
      $($.fn.dataTable.tables( true ) ).DataTable().columns.adjust().draw();
  } ); 

} );