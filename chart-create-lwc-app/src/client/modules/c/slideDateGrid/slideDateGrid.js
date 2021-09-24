import { LightningElement, api } from 'lwc';
import * as xstate from 'c/xstate';
import { byFilterMachine } from './slideDateGridMachine';

const { interpret } = xstate;

const DAY_MS = 86400000;

export default class slideDateGrid extends LightningElement {
    @api data;
    state;
    segwidth;
    datesegs;
    duedatesindexes;

    connectedCallback() {
        this.service = interpret(byFilterMachine)
            .onTransition((s) => {
                this.state = s;
            })
            .start();

        const { total_segments, segment_dur_days } = this.state.context;
        const ts = Date.now();
        const durms = DAY_MS * segment_dur_days;        
        this.datesegs = Array.from({ length: total_segments }).map((e, i) => ({ 
          id: 's' + i,
          timeend: ts + (i * durms),
        }));

        this.duedatesindexes = this.data.map(d => {          
          if (d['Calibration due date']) {
            const nd = new Date(d['Calibration due date']);
            const dueindex = this.datesegs.findIndex(ds => ds.timeend > nd.getTime());
            return dueindex;
          } 
          return null;
        });

        document.addEventListener('keydown', (e) => {
            if (['ArrowRight', 'ArrowLeft'].indexOf(e.key) > -1) {
              e.preventDefault();
                if (
                    e.shiftKey &&
                    (e.key === 'ArrowRight' || e.key === 'ArrowLeft')
                ) {
                    this.service.send({
                        type: `RESIZE.${e.key.substr(5).toUpperCase()}`
                    });
                } else {
                    this.service.send({
                        type: `MOVE.${e.key.substr(5).toUpperCase()}`
                    });
                }
            }
        });
    }

    renderedCallback() {
        const dseg = this.template.querySelector('.dseg');
        const { width } = dseg.getBoundingClientRect();
        this.segwidth = width;
    }

    get viewportData() {
      const { segment_index, num_segments } = this.state.context;
      const sumindxes = this.segmentSections.slice( segment_index, segment_index + num_segments ).reduce((acc, val) => acc.concat(val.indxs), []);
      
      return JSON.stringify(sumindxes.map(si => (this.data[si])), null, 2);
    }

    get segmentSections() {
        return this.datesegs.map(
          (ea, i) => {
            const indxs = this.duedatesindexes.reduce( 
              (acc, val, dueindex) => (val === i ? acc.concat([dueindex]) : acc)
              , []
            )
            
            return { 
              ...ea,
              num_assets: indxs.map(indx => this.data[indx]).length,
              indxs
            };
          }
      );
    }

    get dynamicWidth() {
        return (
            this.segwidth &&
            `width:${this.segwidth * this.state.context.num_segments}px;`
        );
    }

    get segmentsFromLeft() {
        if (this.segwidth === undefined) {
            return '';
        }
        const left = this.segwidth * this.state.context.segment_index;
        const width = (this.segwidth * this.state.context.num_segments) + 14;
        return `left:${left}px;width:${width}px`;
    }

    handleMakeWider(evt) {
        evt.preventDefault();
        evt.stopImmediatePropagation();
        const hmove = (e) => {
            console.log('e.x', e.x);
        };
        const hup = () => {
            console.log('up');

            document.body.removeEventListener('mousemove', hmove);
            window.removeEventListener('mouseup', hup);
        };

        document.body.addEventListener('mousemove', hmove);
        window.addEventListener('mouseup', hup);
    }

    handleHSlide(evt) {
        evt.preventDefault();
        evt.stopImmediatePropagation();
        const el = this.template.querySelector('.movecont');

        const hmove = (e) => {
            e.preventDefault();
            // const movex = (e.clientX - evt.offsetX) - leftbound ;
            const movex = e.clientX - evt.offsetX;
            el.style.transform = `translate(${movex}px)`;
        };
        const hup = () => {
            document.body.removeEventListener('mousemove', hmove);
            window.removeEventListener('mouseup', hup);
        };

        document.body.addEventListener('mousemove', hmove);
        window.addEventListener('mouseup', hup);
    }
}
