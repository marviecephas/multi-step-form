document.addEventListener('DOMContentLoaded', () => {
    let forms = document.querySelector('#form-container');
    let toggle = forms.querySelector('.cycle-toggle');
    let steps = document.querySelector('#step-container');
    let currentForm  = forms.querySelector('.current-form');
    let currentStep  = steps.querySelector('.current-step');
    let plan = '';
    let planCycle    = 'monthly';
    let addOns       = [];
    forms.querySelectorAll('.next').forEach(value => {
        value.addEventListener('click', () => {
        if(validate(currentForm)){return};
        steps.querySelectorAll('.step').forEach(step => {
            step.className = 'step'
        });
        currentStep = currentStep.parentNode.nextElementSibling.querySelector('.step');
        currentStep.className = 'step current-step';
            forms.querySelectorAll('.sub-form-container').forEach(form => {
                form.className = 'sub-form-container';
                form.style.display = 'none';
            })
            currentForm.querySelectorAll('input').forEach(input => {
                    input.previousElementSibling.querySelector('.validation').style.display = 'none';
             });
            currentForm = currentForm.nextElementSibling;
            currentForm.style.display = 'flex';
            currentForm.className = 'sub-form-container current-form';        
        })
    })
    forms.querySelectorAll('.previous').forEach(value => {
        value.addEventListener('click', () => {
        steps.querySelectorAll('.step').forEach(step => {
            step.className = 'step'
        });
        currentStep = currentStep.parentNode.previousElementSibling.querySelector('.step');
        currentStep.className = 'step current-step';
            forms.querySelectorAll('.sub-form-container').forEach(form => {
                form.className = 'sub-form-container';
                form.style.display = 'none';
            })
            currentForm = currentForm.previousElementSibling;
            currentForm.style.display = 'flex';
            currentForm.className = 'sub-form-container current-form';        
        })
    })
    forms.querySelectorAll('.comfirm').forEach(value => {
        value.addEventListener('click', () => {
            forms.querySelectorAll('.sub-form-container').forEach(form => {
                form.className = 'sub-form-container';
                form.style.display = 'none';
            })
            currentForm = currentForm.nextElementSibling;
            currentForm.style.display = 'flex';
            currentForm.className = 'sub-form-container current-form';        
        })
    })
    forms.querySelectorAll('.plan-container').forEach(selplan => {
        selplan.addEventListener('click', () => {
            plan = selplan.querySelector('.plan').innerHTML;
            forms.querySelector('.selected-plan').innerHTML = `${plan} (<span class = 'sel-plan-cycle'>${planCycle}</span>)`;
            forms.querySelector('.selected-plan-cost').innerHTML = selplan.querySelector('.plan-cost').innerHTML;
            forms.querySelectorAll('.plan-container').forEach(selplan => {
                selplan.style.borderColor = (plan == selplan.querySelector('.plan').innerHTML) ? 'hsl(243, 100%, 35%)' : 'hsl(231, 11%, 63%)';
                selplan.style.background = (plan == selplan.querySelector('.plan').innerHTML) ? 'hsl(218, 100%, 97%)' : '';
            })
            let totalCost = 0;
forms.querySelectorAll('.preview-main .cost').forEach(cost => {
  totalCost += Number(cost.innerHTML);
});
forms.querySelector('.cost-main').innerHTML = totalCost;
        })
    })
    toggle.addEventListener('click', () => {
        if(planCycle == 'monthly'){
            planCycle = 'yearly';
            toggle.nextElementSibling.className = 'yearly current-cycle';
            toggle.previousElementSibling.className = 'monthly';
            toggle.querySelector('.toggle-main').style.left = '31px';
            forms.querySelectorAll('.free-duration').forEach(val => {
                val.style.display = 'flex';
            })
            forms.querySelectorAll('.cost').forEach(val => {
                val.innerHTML += '0';
            })
            forms.querySelectorAll('.cycle').forEach(val => {
                val.innerHTML = 'yr';
            })
            forms.querySelector('.cycle-finish').innerHTML = 'year';
            forms.querySelectorAll('.plan-main').forEach(val => {
                val.style.marginBottom = (document.body.offsetWidth < 600) ? '15px' : '15px'; 
            })
            forms.querySelectorAll('.plan-icon').forEach(val => {
                val.style.marginBottom = (document.body.offsetWidth < 600) ? '10px' : '0'; 
            })
            forms.querySelector('.sel-plan-cycle').innerHTML = planCycle;
        }
        
        else{
            planCycle = 'monthly';
            toggle.nextElementSibling.className = 'yearly';
            toggle.previousElementSibling.className = 'monthly current-cycle';
            toggle.querySelector('.toggle-main').style.left = '4px';
            forms.querySelectorAll('.free-duration').forEach(val => {
                val.style.display = 'none';
            })
            forms.querySelectorAll('.cost').forEach(val => {
                val.innerHTML = val.innerHTML.replace('0', '');
            })
            forms.querySelectorAll('.cycle').forEach(val => {
                val.innerHTML = 'mo';
            })
            forms.querySelector('.cycle-finish').innerHTML = 'month';
            forms.querySelectorAll('.plan-main').forEach(val => {
                val.style.marginBottom = (document.body.offsetWidth < 600) ? '0' : '0'; 
            })
            forms.querySelectorAll('.plan-icon').forEach(val => {
                val.style.marginBottom = (document.body.offsetWidth < 600) ? '0' : '10px'; 
            })
            forms.querySelector('.sel-plan-cycle').innerHTML = planCycle;
        }
    })
    
    forms.querySelectorAll('.add-on-container').forEach(val => {
        val.addEventListener('click', () => {
            let addOn = val.querySelector('.add-on');
            let checkBox = val.querySelector('.checkbox');
            
           const seladdOn = document.createElement('p');
            seladdOn.className = 'sel-add-on';
            seladdOn.innerHTML = addOn.innerHTML; 
            seladdOn.style.fontWeight = '400';
            seladdOn.style.color = 'hsl(231, 11%, 63%)'
            const addOnPrice = document.createElement('p');
            addOnPrice.className = 'add-on-price';
            addOnPrice.innerHTML = val.querySelector('.add-on-cost').innerHTML;
            addOnPrice.style.fontWeight = '500';
            addOnPrice.style.color = 'hsl(213, 96%, 18%)';
           const preview = document.createElement('div');
            preview.className = 'preview-main';
            preview.style.fontSize = '.89em';
            preview.appendChild(seladdOn);
            preview.appendChild(addOnPrice);
            
             if(addOns.includes(addOn.innerHTML))
            {
                val.style.borderColor = 'hsl(231, 11%, 63%)';
                val.style.background = '';
                checkBox.style.background = '';
                checkBox.style.borderColor = 'hsl(231, 11%, 63%)';
                let existingPreview = Array.from(forms.querySelectorAll('.sel-add-on')).find(sel => sel.innerHTML === addOn.innerHTML )
if (existingPreview) {
    existingPreview.parentNode.remove();
}
                preview.remove();
                addOns.pop(addOn.innerHTML);
            }
            else{
                val.style.borderColor = 'hsl(243, 100%, 35%)';
                val.style.background = 'hsl(218, 100%, 97%)';
                checkBox.style.background = 'hsl(243, 100%, 62%)';
                checkBox.style.borderColor = 'hsl(243, 100%, 62%)';
          
let existingPreview = Array.from(forms.querySelectorAll('.sel-add-on')).find(sel => sel.innerHTML === addOn.innerHTML )
if (existingPreview) {
} else {
  forms.querySelector('.preview-container').appendChild(preview);
}
                     
                 
                addOns.push(addOn.innerHTML);
            }
            forms.querySelector('.plan-preview').style.borderBottom = (addOns.length == 0) ? 'none' : '1px solid hsla(231, 11%, 63%, .7)';
            
let totalCost = 0;
forms.querySelectorAll('.preview-main .cost').forEach(cost => {
  totalCost += Number(cost.innerHTML);
});
forms.querySelector('.cost-main').innerHTML = totalCost;
        })
    })
    forms.querySelector('.change').addEventListener('click', () => {
        forms.querySelectorAll('.sub-form-container').forEach(form => {
                form.className = 'sub-form-container';
                form.style.display = 'none';
            })
            currentForm = currentForm.previousElementSibling.previousElementSibling;
            currentForm.style.display = 'flex';
            currentForm.className = 'sub-form-container current-form';
            
            steps.querySelectorAll('.step').forEach(step => {
            step.className = 'step'
        });
        currentStep = currentStep.parentNode.previousElementSibling.previousElementSibling.querySelector('.step');
        currentStep.className = 'step current-step';
    })
    function validate(form){
        
       let bool;         switch(Array.from(forms.children).indexOf(form)){
            
            case 0:
                form.querySelectorAll('input').forEach(input => {
                      input.previousElementSibling.querySelector('.validation').style.display = (input.value == '') ? 'flex' : 'none';
                   bool = (input.value == '') ? true : false;
                });
                return bool;
            case 1:
                return (plan == '');
            case 2:
                return (addOns.length == 0);
            break;
        }
    }
})
