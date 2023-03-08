let targetName = $("#Ninja-name");
let image = $("#Target-image");
let attack = $("#Main-attack");
let target 
let lastSeen = $('#Last-seen');
let imageV = $('#image-location');
let children = $('.child');
let pain = $('#pain');


$("#submit").click(()=>{
    filter = $("#search").val()
// if(filter >46 || filter <36){
//     pain.text('You have chosen wrongly and now must be disposed of.')
// } else{
    $.get(`http://localhost:8100/api/character/${filter}`, (data)=>{
        document.getElementById("image-location").src = ""
        console.log('all data: ', data);
        console.log('one character: ', data.name);
        console.log('attack:', data.main_attack);
        let newName = data.name;
        let mainAttack = data.main_attack;
        let village = data.village_id;
        targetName.text(`Your target is ${newName}`);
        attack.text(`Their main attack is ${mainAttack}`);
        lastSeen.text(`The last place they were seen was at village #${village}`);
        const villageImage = new Array("cloud_village.jpeg", "leaf_village.jpeg", "mist_village.jpeg", "sand_village.jpeg", "stone_village.jpeg")
        const randomNum = Math.floor(Math.random() * villageImage.length);
        document.getElementById("image-location").src = villageImage[randomNum];
        document.getElementById("Ninja-name").style.display = "block";
        document.getElementById("Last-seen").style.display = "block"
        document.getElementById("Main-attack").style.display = "block"
    })

// }
})


