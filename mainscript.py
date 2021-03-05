from flask import *
from flask_wtf import FlaskForm
from wtforms import Form, SelectField, validators, SubmitField, IntegerField
from wtforms.validators import DataRequired
from ratio_code.basic_copy import *
# Initializing flask and sql
app = Flask(__name__)
app.config['SECRET_KEY'] = 'you-will-never-guess'

# Root
@app.route("/")
def index():
    return render_template('index.html')

'''
# Pappa
@app.route("/pappa")
def pappa():
    return render_template('pappa.html')


# Bjornbanan
@app.route("/bjornbanan")
def bjornbanan():
    return render_template('bjornbanan.html')

# Portfolio
@app.route("/portfolio")
def portfolio():
    return render_template('portfolio.html')

# prim
@app.route("/portfolio/prim")
def prim():
    return render_template('prim.html')

# Factorio
@app.route("/factorio")
def factorio_home():
    return render_template('factorio_home.html')

names_id = [
    (
        "accumulator",
        "Accumulator"
    ),
    (
        "logistic-chest-active-provider",
        "Active provider chest"
    ),
    (
        "advanced-circuit",
        "Advanced circuit"
    ),
    (
        "arithmetic-combinator",
        "Arithmetic combinator"
    ),
    (
        "artillery-shell",
        "Artillery shell"
    ),
    (
        "artillery-targeting-remote",
        "Artillery targeting remote"
    ),
    (
        "artillery-turret",
        "Artillery turret"
    ),
    (
        "artillery-wagon",
        "Artillery wagon"
    ),
    (
        "assembling-machine-1",
        "Assembling machine 1"
    ),
    (
        "assembling-machine-2",
        "Assembling machine 2"
    ),
    (
        "assembling-machine-3",
        "Assembling machine 3"
    ),
    (
        "atomic-bomb",
        "Atomic bomb"
    ),
    (
        "battery",
        "Battery"
    ),
    (
        "battery-mk1",
        "Battery MK1"
    ),
    (
        "battery-mk2",
        "Battery MK2"
    ),
    (
        "beacon",
        "Beacon"
    ),
    (
        "big-electric-pole",
        "Big electric pole"
    ),
    (
        "blueprint",
        "Blueprint"
    ),
    (
        "blueprint-book",
        "Blueprint book"
    ),
    (
        "boiler",
        "Boiler"
    ),
    (
        "logistic-chest-buffer",
        "Buffer chest"
    ),
    (
        "burner-inserter",
        "Burner inserter"
    ),
    (
        "burner-mining-drill",
        "Burner mining drill"
    ),
    (
        "cannon-shell",
        "Cannon shell"
    ),
    (
        "car",
        "Car"
    ),
    (
        "cargo-wagon",
        "Cargo wagon"
    ),
    (
        "centrifuge",
        "Centrifuge"
    ),
    (
        "chemical-plant",
        "Chemical plant"
    ),
    (
        "cliff-explosives",
        "Cliff explosives"
    ),
    (
        "cluster-grenade",
        "Cluster grenade"
    ),
    (
        "combat-shotgun",
        "Combat shotgun"
    ),
    (
        "concrete",
        "Concrete"
    ),
    (
        "constant-combinator",
        "Constant combinator"
    ),
    (
        "construction-robot",
        "Construction robot"
    ),
    (
        "copper-cable",
        "Copper cable"
    ),
    (
        "copper-plate",
        "Copper plate"
    ),
    (
        "crude-oil-barrel",
        "Crude oil barrel"
    ),
    (
        "decider-combinator",
        "Decider combinator"
    ),
    (
        "deconstruction-planner",
        "Deconstruction planner"
    ),
    (
        "defender-capsule",
        "Defender capsule"
    ),
    (
        "destroyer-capsule",
        "Destroyer capsule"
    ),
    (
        "discharge-defense",
        "Discharge defense"
    ),
    (
        "discharge-defense-remote",
        "Discharge defense remote"
    ),
    (
        "distractor-capsule",
        "Distractor capsule"
    ),
    (
        "effectivity-module",
        "Efficiency module"
    ),
    (
        "effectivity-module-2",
        "Efficiency module 2"
    ),
    (
        "effectivity-module-3",
        "Efficiency module 3"
    ),
    (
        "electric-engine-unit",
        "Electric engine unit"
    ),
    (
        "electric-furnace",
        "Electric furnace"
    ),
    (
        "electric-mining-drill",
        "Electric mining drill"
    ),
    (
        "electronic-circuit",
        "Electronic circuit"
    ),
    (
        "empty-barrel",
        "Empty barrel"
    ),
    (
        "energy-shield",
        "Energy shield"
    ),
    (
        "energy-shield-mk2",
        "Energy shield MK2"
    ),
    (
        "engine-unit",
        "Engine unit"
    ),
    (
        "exoskeleton",
        "Exoskeleton"
    ),
    (
        "explosive-cannon-shell",
        "Explosive cannon shell"
    ),
    (
        "explosive-rocket",
        "Explosive rocket"
    ),
    (
        "explosive-uranium-cannon-shell",
        "Explosive uranium cannon shell"
    ),
    (
        "explosives",
        "Explosives"
    ),
    (
        "express-splitter",
        "Express splitter"
    ),
    (
        "express-transport-belt",
        "Express transport belt"
    ),
    (
        "express-underground-belt",
        "Express underground belt"
    ),
    (
        "fast-inserter",
        "Fast inserter"
    ),
    (
        "fast-splitter",
        "Fast splitter"
    ),
    (
        "fast-transport-belt",
        "Fast transport belt"
    ),
    (
        "fast-underground-belt",
        "Fast underground belt"
    ),
    (
        "filter-inserter",
        "Filter inserter"
    ),
    (
        "firearm-magazine",
        "Firearm magazine"
    ),
    (
        "flamethrower",
        "Flamethrower"
    ),
    (
        "flamethrower-ammo",
        "Flamethrower ammo"
    ),
    (
        "flamethrower-turret",
        "Flamethrower turret"
    ),
    (
        "fluid-wagon",
        "Fluid wagon"
    ),
    (
        "flying-robot-frame",
        "Flying robot frame"
    ),
    (
        "gate",
        "Gate"
    ),
    (
        "green-wire",
        "Green wire"
    ),
    (
        "grenade",
        "Grenade"
    ),
    (
        "gun-turret",
        "Gun turret"
    ),
    (
        "hazard-concrete",
        "Hazard concrete"
    ),
    (
        "heat-exchanger",
        "Heat exchanger"
    ),
    (
        "heat-pipe",
        "Heat pipe"
    ),
    (
        "heavy-armor",
        "Heavy armor"
    ),
    (
        "heavy-oil-barrel",
        "Heavy oil barrel"
    ),
    (
        "high-tech-science-pack",
        "High tech science pack"
    ),
    (
        "inserter",
        "Inserter"
    ),
    (
        "iron-axe",
        "Iron axe"
    ),
    (
        "iron-chest",
        "Iron chest"
    ),
    (
        "iron-gear-wheel",
        "Iron gear wheel"
    ),
    (
        "iron-plate",
        "Iron plate"
    ),
    (
        "iron-stick",
        "Iron stick"
    ),
    (
        "kovarex-enrichment-process",
        "Kovarex enrichment process"
    ),
    (
        "lab",
        "Lab"
    ),
    (
        "lamp",
        "Lamp"
    ),
    (
        "land-mine",
        "Land mine"
    ),
    (
        "landfill",
        "Landfill"
    ),
    (
        "laser-turret",
        "Laser turret"
    ),
    (
        "light-armor",
        "Light armor"
    ),
    (
        "light-oil-barrel",
        "Light oil barrel"
    ),
    (
        "locomotive",
        "Locomotive"
    ),
    (
        "logistic-robot",
        "Logistic robot"
    ),
    (
        "long-handed-inserter",
        "Long handed inserter"
    ),
    (
        "low-density-structure",
        "Low density structure"
    ),
    (
        "lubricant-barrel",
        "Lubricant barrel"
    ),
    (
        "medium-electric-pole",
        "Medium electric pole"
    ),
    (
        "military-science-pack",
        "Military science pack"
    ),
    (
        "modular-armor",
        "Modular armor"
    ),
    (
        "nightvision",
        "Nightvision"
    ),
    (
        "nuclear-fuel",
        "Nuclear fuel"
    ),
    (
        "nuclear-fuel-reprocessing",
        "Nuclear fuel reprocessing"
    ),
    (
        "nuclear-reactor",
        "Nuclear reactor"
    ),
    (
        "offshore-pump",
        "Offshore pump"
    ),
    (
        "oil-refinery",
        "Oil refinery"
    ),
    (
        "logistic-chest-passive-provider",
        "Passive provider chest"
    ),
    (
        "personal-laser-defense",
        "Personal laser defense"
    ),
    (
        "personal-roboport",
        "Personal roboport"
    ),
    (
        "personal-roboport-mk2",
        "Personal roboport MK2"
    ),
    (
        "petroleum-gas-barrel",
        "Petroleum gas barrel"
    ),
    (
        "piercing-rounds-magazine",
        "Piercing rounds magazine"
    ),
    (
        "piercing-shotgun-shells",
        "Piercing shotgun shells"
    ),
    (
        "pipe",
        "Pipe"
    ),
    (
        "pipe-to-ground",
        "Pipe to ground"
    ),
    (
        "pistol",
        "Pistol"
    ),
    (
        "plastic-bar",
        "Plastic bar"
    ),
    (
        "poison-capsule",
        "Poison capsule"
    ),
    (
        "portable-fusion-reactor",
        "Portable fusion reactor"
    ),
    (
        "portable-solar-panel",
        "Portable solar panel"
    ),
    (
        "power-armor",
        "Power armor"
    ),
    (
        "power-armor-mk2",
        "Power armor MK2"
    ),
    (
        "power-switch",
        "Power switch"
    ),
    (
        "processing-unit",
        "Processing unit"
    ),
    (
        "production-science-pack",
        "Production science pack"
    ),
    (
        "productivity-module",
        "Productivity module"
    ),
    (
        "productivity-module-2",
        "Productivity module 2"
    ),
    (
        "productivity-module-3",
        "Productivity module 3"
    ),
    (
        "programmable-speaker",
        "Programmable speaker"
    ),
    (
        "pump",
        "Pump"
    ),
    (
        "pumpjack",
        "Pumpjack"
    ),
    (
        "radar",
        "Radar"
    ),
    (
        "rail",
        "Rail"
    ),
    (
        "rail-chain-signal",
        "Rail chain signal"
    ),
    (
        "rail-signal",
        "Rail signal"
    ),
    (
        "red-wire",
        "Red wire"
    ),
    (
        "refined-concrete",
        "Refined concrete"
    ),
    (
        "refined-hazard-concrete",
        "Refined hazard concrete"
    ),
    (
        "repair-pack",
        "Repair pack"
    ),
    (
        "logistic-chest-requester",
        "Requester chest"
    ),
    (
        "roboport",
        "Roboport"
    ),
    (
        "rocket",
        "Rocket"
    ),
    (
        "rocket-control-unit",
        "Rocket control unit"
    ),
    (
        "rocket-fuel",
        "Rocket fuel"
    ),
    (
        "rocket-launcher",
        "Rocket launcher"
    ),
    (
        "rocket-part",
        "Rocket part"
    ),
    (
        "rocket-silo",
        "Rocket silo"
    ),
    (
        "satellite",
        "Satellite"
    ),
    (
        "science-pack-1",
        "Science pack 1"
    ),
    (
        "science-pack-2",
        "Science pack 2"
    ),
    (
        "science-pack-3",
        "Science pack 3"
    ),
    (
        "shotgun",
        "Shotgun"
    ),
    (
        "shotgun-shells",
        "Shotgun shells"
    ),
    (
        "slowdown-capsule",
        "Slowdown capsule"
    ),
    (
        "small-electric-pole",
        "Small electric pole"
    ),
    (
        "solar-panel",
        "Solar panel"
    ),
    (
        "solid-fuel",
        "Solid fuel"
    ),
    (
        "space-science-pack",
        "Space science pack"
    ),
    (
        "speed-module",
        "Speed module"
    ),
    (
        "speed-module-2",
        "Speed module 2"
    ),
    (
        "speed-module-3",
        "Speed module 3"
    ),
    (
        "splitter",
        "Splitter"
    ),
    (
        "stack-filter-inserter",
        "Stack filter inserter"
    ),
    (
        "stack-inserter",
        "Stack inserter"
    ),
    (
        "steam-engine",
        "Steam engine"
    ),
    (
        "steam-turbine",
        "Steam turbine"
    ),
    (
        "steel-axe",
        "Steel axe"
    ),
    (
        "steel-chest",
        "Steel chest"
    ),
    (
        "steel-furnace",
        "Steel furnace"
    ),
    (
        "steel-plate",
        "Steel plate"
    ),
    (
        "stone-brick",
        "Stone brick"
    ),
    (
        "stone-furnace",
        "Stone furnace"
    ),
    (
        "stone-wall",
        "Stone wall"
    ),
    (
        "logistic-chest-storage",
        "Storage chest"
    ),
    (
        "storage-tank",
        "Storage tank"
    ),
    (
        "submachine-gun",
        "Submachine gun"
    ),
    (
        "substation",
        "Substation"
    ),
    (
        "sulfur",
        "Sulfur"
    ),
    (
        "sulfuric-acid-barrel",
        "Sulfuric acid barrel"
    ),
    (
        "tank",
        "Tank"
    ),
    (
        "train-stop",
        "Train stop"
    ),
    (
        "transport-belt",
        "Transport belt"
    ),
    (
        "underground-belt",
        "Underground belt"
    ),
    (
        "uranium-cannon-shell",
        "Uranium cannon shell"
    ),
    (
        "uranium-fuel-cell",
        "Uranium fuel cell"
    ),
    (
        "uranium-processing",
        "Uranium processing"
    ),
    (
        "uranium-rounds-magazine",
        "Uranium rounds magazine"
    ),
    (
        "uranium-235",
        "Uranium-235"
    ),
    (
        "uranium-238",
        "Uranium-238"
    ),
    (
        "used-up-uranium-fuel-cell",
        "Used up uranium fuel cell"
    ),
    (
        "water-barrel",
        "Water barrel"
    ),
    (
        "wood",
        "Wood"
    ),
    (
        "wooden-chest",
        "Wooden chest"
    )
]

class simple(FlaskForm):
    component = SelectField('Component ', choices=names_id,
                            validators=[DataRequired()])
    amount = IntegerField('Amount per second', validators=[DataRequired()], default=1)
    smeliting_mod = IntegerField('Smelting mod', validators=[
                                 DataRequired()], default=1)
    assembler_mod = IntegerField('Assembler mod', validators=[
                                 DataRequired()], default=1)
    submit = SubmitField('Run')

# proportions calc
@app.route("/factorio/proportion",  methods=['GET', 'POST'])
def prop_calc():
    ratio = "nno"
    component = "trash"
    sop = "fuck u"
    form = simple()
    submitted = False
    if form.validate_on_submit():
        submitted = True
        component = form.component.data
        result = get_components(form.component.data, form.amount.data,
                                form.smeliting_mod.data, form.assembler_mod.data)
        ratio=str(result["ratio"])
        sop = stage(result, 1, [])
    return render_template('prop_calc.html',
                           form=form,
                           ratio=ratio,
                           component=component,
                           submitted=submitted,
                           sop=sop)
'''
# Run the site
if __name__ == "__main__":
    app.run()
