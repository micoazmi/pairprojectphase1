function formatRp(v){
    let rupiahFormat = v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return 'Rp '+rupiahFormat
}

module.exports=formatRp