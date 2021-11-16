from flask import *
from config import *
from ratio_code.basic_copy import *
from forms.factorio_form import *

factorio = Blueprint('factorio', __name__)


@factorio.route("/",  methods=['GET', 'POST'])
def prop_calc():
    form = factorioform()
    if form.validate_on_submit():
        component = form.component.data
        result = get_components(form.component.data, form.amount.data,
                                form.smeliting_mod.data, form.assembler_mod.data)
        ratio = str(result["ratio"])
        sop = stage(result, 1, [])
        return render_template('factorio_proportions.html', form=form, ratio=ratio, component=component, submitted=True,  sop=sop)
    return render_template('factorio_proportions.html', form=form, ratio="wee", component="component", submitted=False, sop="sop")

