package com.enirisst.rso_api.row_mappers;


import com.enirisst.rso_api.models.O;
import org.springframework.jdbc.core.RowMapper;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.sql.ResultSet;
import java.sql.SQLException;

import static java.lang.Math.round;



public class OMapper implements RowMapper<O> {
    private int dec=1;
    private boolean rounded=true;


    public OMapper(boolean rounded, int dec) {
        this.dec=dec;
        this.rounded = rounded;
    }

    public OMapper() {
    }
    @Override
    public O mapRow(ResultSet rs, int rowNum) throws SQLException {
        if (this.rounded==false){
            // double d=Double.valueOf(df.format(rs.getDouble("indicator")));
            BigDecimal bd = new BigDecimal(rs.getDouble("indicator")).setScale(dec, RoundingMode.HALF_UP);
            double ind=bd.doubleValue();
            return new O(rs.getString("GEOCODE_ACC_CL"),rs.getString("oikismos"),rs.getInt("YEAR_ID"),ind);
        }



        return new O(rs.getString("GEOCODE_ACC_CL"),rs.getString("oikismos"),rs.getInt("YEAR_ID"),round(rs.getDouble("indicator")));
    }


}
