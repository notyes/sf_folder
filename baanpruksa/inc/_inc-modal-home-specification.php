<div class="modal fade ps-how-to-buy-box" id="ps-how-to-buy-box" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title ff-dbGill-reg">HOW TO BUY / วิธีการสั่งซื้อ</h4>
      </div>
      <div class="modal-body">
        <ul class="nav nav-tabs" id="step_tab">
          <li class="active"><a href="#step_1" data-toggle="tab">ขั้นตอนที่ 1</a></li>
          <li><a href="#step_2" data-toggle="tab">ขั้นตอนที่ 2</a></li>
          <li><a href="#step_3" data-toggle="tab">ขั้นตอนที่ 3</a></li>
          <li><a href="#step_4" data-toggle="tab">ขั้นตอนที่ 4</a></li>
          <li><a href="#step_5" data-toggle="tab">ขั้นตอนที่ 5</a></li>
        </ul>

        <!-- Tab panes -->
        <div class="tab-content">
          <div class="tab-pane active" id="step_1"><img id="pic1" src="img/home-spec/how/how-1.png" alt="step 1" class="showPic"></div>
          <div class="tab-pane" id="step_2"><img id="pic2" src="img/home-spec/how/how-2.png" alt="step 2" class="showPic"></div>
          <div class="tab-pane" id="step_3"><img id="pic3" src="img/home-spec/how/how-3.png" alt="step 3" class="showPic"></div>
          <div class="tab-pane" id="step_4"><img id="pic4" src="img/home-spec/how/how-4.png" alt="step 4" class="showPic"></div>
          <div class="tab-pane" id="step_5"><img id="pic5" src="img/home-spec/how/how-5.png" alt="step 5" class="showPic"></div>
        </div>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div class="modal fade ps-buynow-box" id="ps-buynow-box" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-md">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title ff-dbGill-reg">ตรวจสองสถานะลูกค้าในเครือ พฤกษา เรียลเอสเตท</h4>
      </div>
      <div class="modal-body">
        <div class="form-container">
          <form role="form" method="POST" id="validate-customer" action="validate-customer.php">
            <div class="form-group">
              <label for="gender">คำนำหน้าชื่อ</label>
              <select class="form-control" name="gender" id="gender" required>
                <option value="">เลือกคำนำหน้าชื่อ</option>
                <option value="นาย">นาย</option>
                <option value="นาง">นาง</option>
                <option value="นางสาว">นางสาว</option>
              </select>
            </div>
            <div class="form-group">
              <label for="fname">ชื่อ</label>
              <input type="text" class="form-control" name="fname" id="fname" placeholder="ชื่อ" required />
            </div>
            <div class="form-group">
              <label for="lname">นามสกุล</label>
              <input type="text" class="form-control" name="lname" id="lname" placeholder="นามสกุล" required />
            </div>
            <div class="form-group">
              <label for="email">อีเมล์</label>
              <input type="text" class="form-control" name="email" id="email" placeholder="อีเมล์" required />
            </div>
            <div class="form-group">
              <label for="tel">เบอร์โทรติดต่อ</label>
              <input type="text" class="form-control" name="tel" id="tel" placeholder="เบอร์โทรติดต่อ" required />
            </div>
            <div class="form-group">
              <label for="addr">เลขที่บ้าน</label>
              <input type="text" class="form-control" name="addr" id="addr" placeholder="เลขที่บ้าน" required />
            </div>
            <div class="checkbox">
              <label><input type="checkbox" name="accept" id="accept" required> อ่าน <a href="#condition" target="_blank"><span>ข้อกำหนดเงื่อนไข</span></a> เรียบร้อยแล้ว</label>
            </div>
            <input type="hidden" name="pid" id="pid"/>
            <button type="submit" class="btn btn-primary">SUBMIT</button>
            <button type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">CANCEL</button>
          </form>
        </div>
        <div class="form-result"></div>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->