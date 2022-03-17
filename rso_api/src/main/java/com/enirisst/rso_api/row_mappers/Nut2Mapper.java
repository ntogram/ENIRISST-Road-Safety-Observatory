package com.enirisst.rso_api.row_mappers;


import com.enirisst.rso_api.models.Nut2;
import org.springframework.jdbc.core.RowMapper;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.sql.ResultSet;
import java.sql.SQLException;


import static java.lang.Math.round;
//nut2,nut3,nut4,nut8,nut9
public class Nut2Mapper implements  RowMapper<Nut2> {

    private int dec=1;
    private boolean rounded=true;

    public Nut2Mapper(boolean rounded,int dec) {
        this.dec=dec;
        this.rounded = rounded;
    }

    public Nut2Mapper() {
    }

    @Override
    public Nut2 mapRow(ResultSet rs, int rowNum) throws SQLException {
        if (this.rounded==false){
           // double d=Double.valueOf(df.format(rs.getDouble("indicator")));
            BigDecimal bd = new BigDecimal(rs.getDouble("indicator")).setScale(dec, RoundingMode.HALF_UP);
            double ind=bd.doubleValue();
            return new Nut2(rs.getString("eu_code"),rs.getString("nut"),rs.getInt("YEAR_ID"),ind);
        }



        return new Nut2(rs.getString("eu_code"),rs.getString("nut"),rs.getInt("YEAR_ID"),round(rs.getDouble("indicator")));
    }
}
